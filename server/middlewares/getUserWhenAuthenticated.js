import passport from '../services/passport'

// This for setting the user value when the festival is free for checing if user is owner later.

export function getUserWhenAuthenticated(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err)
    }

    if (user) {
      req.user = user
    } else {
      req.user = {}
    }

    next()
  })(req, res, next)
}