import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from './base'

import { getMyActivities } from '../handlers/activity'

export default {
  findAll: (req, res, next) => {
    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = req.query

    return getMyActivities(limit, offset)
      .then(result => {
        res.json(result)
      })
      .catch(err => next(err))
  },
}
