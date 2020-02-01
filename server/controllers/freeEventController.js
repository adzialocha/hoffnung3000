import httpStatus from 'http-status'

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  lookupWithSlug,
  prepareResponse,
} from './base'

import { APIError } from '../helpers/errors'
import { getConfig } from '../config'

import {
  EventBelongsToManyImage,
  EventBelongsToPlace,
  EventHasManySlots,
} from '../database/associations'

import Event from '../models/event'

function findOneWithSlug(slug, req, res, next) {
  // find one event when festival is free
}

export default {
  findOneWithSlug: (req, res, next) => {
    return findOneWithSlug(req.params.resourceSlug, req, res, next)
  },
  lookup: (req, res, next) => {
    return lookupWithSlug(Event, req, res, next)
  },
  findAll: (req, res, next) => {
    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = req.query

    return Event.findAndCountAll({
      distinct: true,
      include: [
        EventBelongsToManyImage,
        EventHasManySlots, {
          association: EventBelongsToPlace,
          required: true,
          where: {
            isPublic: true,
          },
        },
      ],
      limit,
      offset,
      where: {
        isPublic: true,
      },
      order: [
        [
          EventHasManySlots,
          'from',
          'ASC',
        ],
      ],
    })
      .then(result => {
        res.json({
          data: result.rows,
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          total: result.count,
        })
      })
      .catch(err => next(err))
  },
}
