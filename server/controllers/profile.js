import httpStatus from 'http-status'

import { APIError } from '../helpers/errors'
import { generateToken } from '../services/passport'

import User from '../models/user'

export function update(req, res, next) {
  const { password, newPassword } = req.body
  const id = req.user.id

  User.findOne({ where: { id } })
    .then(user => {
      if (!user) {
        next(
          new APIError('User does not exist', httpStatus.BAD_REQUEST)
        )
        return
      }

      if (!user.comparePasswords(password)) {
        next(
          new APIError(
            'The current password is not correct',
            httpStatus.BAD_REQUEST
          )
        )
        return
      }

      User.update({ password: newPassword }, {
        where: { id },
        limit: 1,
        returning: true,
      })
        .then((data) => {
          const updatedUser = data[1][0]
          res.json({
            data: updatedUser,
            message: 'ok',
            token: generateToken(updatedUser),
          })
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

export default {
  update,
}
