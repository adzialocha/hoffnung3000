import {
  createCurated,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  destroyWithSlug,
  findAllCurated,
  findOneCuratedWithSlug,
  lookupWithSlug,
  prepareResponseAll,
  updateCuratedWithSlug,
} from './base'

import Event from '../models/event'
import Resource, { ResourceBelongsToAnimal } from '../models/resource'
import Slot from '../models/slot'

const permittedFields = [
  'description',
  'title',
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
    return createCurated(Resource, permittedFields, req, res, next)
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
    return findOneCuratedWithSlug(Resource, req, res, next)
  },
  lookup: (req, res, next) => {
    return lookupWithSlug(Resource, req, res, next)
  },
  update: (req, res, next) => {
    return updateCuratedWithSlug(Resource, permittedFields, req, res, next)
  },
}
