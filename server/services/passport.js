import passport from 'passport'
import passportJwt from 'passport-jwt'

import User from '../models/user'

const options = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET,
}

const strategy = new passportJwt.Strategy(options, (payload, next) => {
  User.findById(payload.id)
    .then((user) => next(null, user))
    .catch(() => next(null, false))
})

passport.use(strategy)
