// Check and set if festival is free for unregistered Visitors

import httpStatus from 'http-status'

import { APIError } from '../helpers/errors'
import { getConfig } from '../config'

function authorizeFreeFestival(req, res, next) {
  return getConfig('festivalTicketPrice').then(config => {
    if (config.festivalTicketPrice !== 0 && !req.user.isActive) {
      return next(
        new APIError('Access forbidden', httpStatus.FORBIDDEN, true)
      )
    }
    return next()
  })
}

export function grantWhenFestivalFree(req, res, next) {
  return authorizeFreeFestival(req, res, next)
}
