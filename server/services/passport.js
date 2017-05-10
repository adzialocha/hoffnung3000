import passport from 'passport'
import passportJwt from 'passport-jwt'

import User from '../models/user'

const options = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET,
}

const strategy = new passportJwt.Strategy(options, (payload, next) => {
  User.findById(payload.user.id)
    .then((user) => {
      next(null, user)
      return null
    })
    .catch(() => {
      next(null, false)
      return null
    })
})

passport.use(strategy)

export default passport
