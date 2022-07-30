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

import pick from '../../common/utils/pick'

import {
  AnimalBelongsToUser,
  ResourceBelongsToAnimal,
  ResourceBelongsToManyImage,
} from '../database/associations'

import Event from '../models/event'
import Resource from '../models/resource'
import Slot from '../models/slot'

import { getConfig } from '../config'

const permittedFields = [
  'description',
  'images',
  'title',
]

const include = [
  {
    association: ResourceBelongsToAnimal,
    include: AnimalBelongsToUser,
  },
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

  return getConfig('isAnonymizationEnabled').then(config => {
    return Resource.findAndCountAll({
      distinct: true,
      limit,
      offset,
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [
        ...include,
        {
          model: Event,
          as: 'events',
          required: false,
          include: [
            {
              model: Slot,
              as: 'slots',
              required: false,
              where: {
                [Op.and]: [{
                  eventId,
                }, {
                  from: {
                    [Op.lte]: req.query.to,
                  },
                }, {
                  to: {
                    [Op.gte]: req.query.from,
                  },
                }],
              },
            },
          ],
        },
      ],
    })
      .then(result => {
        const extendedReponse = prepareResponseAll(
          result.rows,
          req,
          config.isAnonymizationEnabled
        ).map(row => {
          // Resources are available when we could not find any
          // slot from another event being associated with it
          row.isAvailable = row.events.find(events => {
            return events.slots.length > 0
          }) === undefined

          // Do not expose the events, it is not needed
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
  })
}

function findOneWithSlug(slug, req, res, next) {
  return getConfig('isAnonymizationEnabled').then(config => {
    return Resource.findOne({
      include,
      rejectOnEmpty: true,
      where: {
        slug,
      },
    })
      .then(data => res.json(
        prepareResponse(
          data,
          req,
          config.isAnonymizationEnabled,
        )
      ))
      .catch(err => next(err))
  })
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
    })
      .then(resource => {
        return findOneWithSlug(resource.slug, req, res, next)
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

    return getConfig('isAnonymizationEnabled').then(config => {
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
            data: prepareResponseAll(
              result.rows,
              req,
              config.isAnonymizationEnabled
            ),
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            total: result.count,
          })
        })
        .catch(err => next(err))
    })
  },
  findOneWithSlug: (req, res, next) => {
    return findOneWithSlug(req.params.resourceSlug, req, res, next)
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

        return getConfig('isAnonymizationEnabled').then(config => {
          return updateImagesForObject(previousResource, req.body.images)
            .then(() => {
              return Resource.findByPk(previousResource.id, { include })
                .then(resource => {
                  res.json(prepareResponse(
                    resource,
                    req,
                    config.isAnonymizationEnabled
                  ))
                })
            })
        })
      })
      .catch(err => next(err))
  },
}
