import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

import User from '../models/user'

const TOKEN_EXPIRY = '96 hours'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET,
}

const tokenOptions = {
  algorithm: 'HS512',
  expiresIn: TOKEN_EXPIRY,
}

const strategy = new Strategy(options, (payload, next) => {
  User.findByPk(payload.user.id)
    .then(user => {
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

export function generateToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, tokenOptions)
}
