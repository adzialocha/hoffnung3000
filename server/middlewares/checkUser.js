import httpStatus from 'http-status'
import passport from '../services/passport'

// This for setting the user value when the festival is free for checing if user is owner later.

function checkJWT(req, res, next) {
  return passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      req.user = {}
      return next()
    }
    req.user = user
    return next()
  })(req, res, next)
}

export function checkUser(req, res, next) {
  return checkJWT(req, res, next)
}
