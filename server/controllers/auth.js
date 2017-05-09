import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'

import { APIError } from '../helpers/errors'
import User from '../models/user'

const JWT_ALGORITHM = 'HS512'
const JWT_EXPIRATION = '12 hours'

function signup(req, res, next) {
  const { firstname, lastname, email, password } = req.body

  User.findOne({ where: { email } })
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
        .then((user) => { res.json({ message: 'ok', user }) })
        .catch(err => next(err))
    })
}

function login(req, res, next) {
  const { email, password } = req.body
  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return next(
          new APIError('User does not exist', httpStatus.BAD_REQUEST)
        )
      }

      if (!user.comparePasswords(password)) {
        return next(
          new APIError('Invalid credentials', httpStatus.UNAUTHORIZED)
        )
      }

      const options = {
        algorithm: JWT_ALGORITHM,
        expiresIn: JWT_EXPIRATION,
      }
      const payload = { id: user.id }
      const token = jwt.sign(payload, process.env.JWT_SECRET, options)

      return res.json({ message: 'ok', token, user })
    })
    .catch(err => next(err))
}

export default {
  signup,
  login,
}
