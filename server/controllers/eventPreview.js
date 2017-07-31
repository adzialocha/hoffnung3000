import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from './base'

import {
  EventBelongsToManyImage,
  EventHasManySlots,
} from '../database/associations'

import Event from '../models/event'

const include = [
  EventBelongsToManyImage,
  EventHasManySlots,
]

export default {
  findAll: (req, res, next) => {
    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = req.query

    return Event.findAndCountAll({
      include,
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
