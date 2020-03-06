import httpStatus from 'http-status'
import passport from '../services/passport'

import { APIError } from '../helpers/errors'

function checkJWT(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return next(
        new APIError('Unauthorized', httpStatus.UNAUTHORIZED)
      )
    }
    req.user = user
    return next()
  })(req, res, next)
}

export function authorizeJWT(req, res, next) {
  return checkJWT(req, res, next)
}
