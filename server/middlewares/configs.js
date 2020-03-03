import httpStatus from 'http-status'

import { APIError } from '../helpers/errors'
import { getConfig } from '../config'

export default function checkConfig(requiredFields) {
  const query = typeof requiredFields === 'string' ? [requiredFields] : requiredFields

  return (req, res, next) => {
    getConfig(query).then(config => {
      query.forEach(fieldName => {
        if (!config[fieldName]) {
          return next(new APIError('This feature is not available', httpStatus.FORBIDDEN))
        }

        return next()
      })
    })
  }
}
