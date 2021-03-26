import passport from '../services/passport'

// This for setting the user value when the festival is free for checking if
// user is owner later.
export function getUserWhenAuthenticated(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      next(err)
      return
    }

    if (user) {
      req.user = user
    } else {
      req.user = {
        isVisitor: true,
        isParticipant: false,
      }
    }

    next()
  })(req, res, next)
}
