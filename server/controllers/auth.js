import jwt from 'jsonwebtoken'

import { APIAuthError } from '../helpers/errors'
import User from '../models/user'

function login(req, res, next) {
  const { email } = req.body
  User.findOne({ email })
    .then(user => {
      if (user.comparePasswords()) {
        const payload = { id: user.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        res.json({
          message: 'ok',
          token,
        })
      } else {
        next(new APIAuthError('Invalid credentials'))
      }
    })
    .catch(() => {
      next(new APIAuthError('User does not exist'))
    })
}

export default {
  login,
}
