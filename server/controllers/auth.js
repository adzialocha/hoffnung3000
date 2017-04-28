import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'

import { APIError } from '../helpers/errors'
import User from '../models/user'

function signup(req, res, next) {
  const { firstname, lastname, email, password } = req.body

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return next(new APIError('User already exists', httpStatus.BAD_REQUEST))
      }

      return User.create({
        firstname,
        lastname,
        password,
        email,
      })
        .then(() => { res.json({ message: 'ok' }) })
        .catch(err => next(err))
    })
}

function login(req, res, next) {
  const { email, password } = req.body
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return next(
          new APIError('User does not exist', httpStatus.BAD_REQUEST)
        )
      }

      if (!User.comparePasswords(user.password, password)) {
        return next(
          new APIError('Invalid credentials', httpStatus.UNAUTHORIZED)
        )
      }

      const payload = { id: user.id }
      const token = jwt.sign(payload, process.env.JWT_SECRET)

      user.update({ token }).then(() => {
        res.json({ message: 'ok', token })
      }).catch(err => next(err))
    })
    .catch(err => next(err))
}

export default {
  signup,
  login,
}
