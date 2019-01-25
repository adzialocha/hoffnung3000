import { Op } from 'sequelize'

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  lookupWithSlug,
  prepareResponse,
  prepareResponseAll,
} from './base'

import { updateImagesForObject } from '../handlers/image'
import { deleteResourcesByIds } from '../handlers/resource'

import pick from '../utils/pick'

import {
  ResourceBelongsToAnimal,
  ResourceBelongsToManyImage,
} from '../database/associations'

import Event from '../models/event'
import Resource from '../models/resource'
import Slot from '../models/slot'

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

  let eventId = { [Op.not]: null }
  if (req.query.eventId) {
    eventId = { [Op.and]: [eventId, { [Op.not]: req.query.eventId }] }
  }

  return Resource.findAndCountAll({
    distinct: true,
    limit,
    offset,
    order: [
      ['createdAt', 'DESC'],
    ],
    include: [
      ResourceBelongsToManyImage,
      ResourceBelongsToAnimal, {
        model: Event,
        as: 'events',
        include: [{
          model: Slot,
          as: 'slots',
          where: {
            [Op.and]: [{
              eventId,
            }, {
              from: {
                [Op.lt]: req.query.to,
              },
            }, {
              to: {
                [Op.gt]: req.query.from,
              },
            }],
          },
        }],
      },
    ],
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
    return deleteResourcesByIds([req.resourceId])
      .then(() => {
        res.json({ message: 'ok' })
      })
      .catch(err => next(err))
  },
  findAll: (req, res, next) => {
    // Is there a time filter activated?
    if (req.query.from && req.query.to) {
      return findAllWithAvailability(req, res, next)
    }

    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = req.query

    return Resource.findAndCountAll({
      distinct: true,
      include,
      limit,
      offset,
      order: [
        ['createdAt', 'DESC'],
      ],
    })
      .then(result => {
        res.json({
          data: prepareResponseAll(result.rows, req),
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          total: result.count,
        })
      })
      .catch(err => next(err))
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
        individualHooks: true,
        limit: 1,
        returning: true,
        where: {
          slug: req.params.resourceSlug,
        },
      }
    )
      .then(data => {
        const previousResource = data[1][0]

        return updateImagesForObject(previousResource, req.body.images)
          .then(() => {
            return Resource.findByPk(previousResource.id, { include })
              .then(resource => {
                res.json(prepareResponse(resource, req))
              })
          })
      })
      .catch(err => next(err))
  },
}
