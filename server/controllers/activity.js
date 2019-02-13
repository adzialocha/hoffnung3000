import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from './base'

import { APIError } from '../helpers/errors'
import { getMyActivities } from '../handlers/activity'

export default {
  findAll: (req, res, next) => {
    return getConfig('isActivityStreamEnabled').then(config => {
      if (!config.isActivityStreamEnabled) {
        next(new APIError('Activity stream is not available', httpStatus.FORBIDDEN))
        return null
      }

      const {
        limit = DEFAULT_LIMIT,
        offset = DEFAULT_OFFSET,
      } = req.query

      return getMyActivities(limit, offset, req.user.id)
        .then(result => {
          res.json(result)
        })
        .catch(err => next(err))
    })
  },
}
