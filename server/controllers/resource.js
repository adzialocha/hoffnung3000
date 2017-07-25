import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  destroyWithSlug,
  findAllCurated,
  lookupWithSlug,
  prepareResponse,
  prepareResponseAll,
} from './base'

import Event from '../models/event'
import Image from '../models/image'
import Resource, {
  ResourceBelongsToAnimal,
  ResourceBelongsToManyImage,
} from '../models/resource'
import Slot from '../models/slot'

import pick from '../utils/pick'

const permittedFields = [
  'description',
  'images',
  'title',
]

const include = [
  ResourceBelongsToAnimal,
  ResourceBelongsToManyImage,
]

function findAllWithAvailability(req, res, next) {
  const {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
  } = req.query

  let eventId = { $not: null }
  if (req.query.eventId) {
    eventId = { $and: [eventId, { $not: req.query.eventId }] }
  }

  return Resource.findAndCountAll({
    limit,
    offset,
    order: [
      ['createdAt', 'DESC'],
    ],
    include: [ ResourceBelongsToAnimal, {
      model: Event,
      as: 'events',
      include: [{
        model: Slot,
        as: 'slots',
        where: {
          $and: [{
            eventId,
          }, {
            from: {
              $lte: req.query.to,
            },
          }, {
            to: {
              $gte: req.query.from,
            },
          }],
        },
      }],
    }],
  })
    .then(result => {
      const extendedReponse = prepareResponseAll(result.rows, req).map(row => {
        row.isAvailable = (row.events.length === 0)
        delete row.events
        return row
      })

      res.json({
        data: extendedReponse,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        total: result.count,
      })
    })
    .catch(err => next(err))
}

export default {
  create: (req, res, next) => {
    return Resource.create({
      ...pick(permittedFields, req.body),
      animal: {
        userId: req.user.id,
      },
    }, {
      include,
      returning: true,
    })
      .then(resource => {
        res.json(prepareResponse(resource, req))
      })
      .catch(err => next(err))
  },
  destroy: (req, res, next) => {
    return destroyWithSlug(Resource, req, res, next)
  },
  findAll: (req, res, next) => {
    // is there a time filter activated?
    if (req.query.from && req.query.to) {
      return findAllWithAvailability(req, res, next)
    }

    return findAllCurated(Resource, req, res, next)
  },
  findOneWithSlug: (req, res, next) => {
    return Resource.findOne({
      include,
      rejectOnEmpty: true,
      where: {
        slug: req.params.resourceSlug,
      },
    })
      .then(data => res.json(prepareResponse(data, req)))
      .catch(err => next(err))
  },
  lookup: (req, res, next) => {
    return lookupWithSlug(Resource, req, res, next)
  },
  update: (req, res, next) => {
    return Resource.update(
      pick(permittedFields, req.body), {
        include,
        where: {
          slug: req.params.resourceSlug,
        },
        limit: 1,
        returning: true,
      }
    )
      .then(data => {
        const previousResource = data[1][0]

        // remove images when needed
        const keptImages = req.body.images.filter(img => img.id)
        const keptImageIds = keptImages.map(img => img.id)

        const removeImagesPromise = previousResource.getImages()
          .then(currentImages => {
            const removeImages = currentImages.filter(image => {
              return !keptImageIds.includes(image.id)
            })

            const removePromises = removeImages.map(image => {
              return Promise.all([
                image.destroy(),
                previousResource.removeImage(image),
              ])
            })

            return Promise.all(removePromises)
          })

        // add new images when given
        const newImages = req.body.images.filter(img => !img.id)

        const addNewImagesPromise = Image.bulkCreate(newImages, {
          returning: true,
        })
          .then(createdImages => {
            const addPromises = createdImages.map(image => {
              return previousResource.addImage(image)
            })

            return Promise.all(addPromises)
          })

        // return updated resource
        return Promise.all([removeImagesPromise, addNewImagesPromise])
          .then(() => {
            return Resource.findById(previousResource.id, { include })
              .then(resource => {
                res.json(prepareResponse(resource, req))
              })
          })
      })
      .catch(err => next(err))
  },
}
