import httpStatus from 'http-status'
import { Op } from 'sequelize'

import User from '../models/user'
import checkout from '../services/checkout'
import db from '../database'
import pick from '../utils/pick'
import { APIError } from '../helpers/errors'
import { generateRandomHash } from '../utils/randomHash'
import { generateToken } from '../services/passport'
import { getConfig } from '../config'
import { translate } from '../../common/services/i18n'

import {
  sendAdminRegistrationNotification,
  sendPasswordReset,
} from '../helpers/mailTemplate'

const PASSWORD_RESET_EXPIRY = 15 // Minutes

const permittedFields = [
  'email',
  'firstname',
  'password',
]

function signup(req, res, next) {
  const fields = pick(permittedFields, req.body)
  fields.isParticipant = true

  const { email } = fields

  return getConfig(['isSignUpParticipantEnabled'])
    .then(config => {
      if (!config.isSignUpParticipantEnabled) {
        next(new APIError('Sign up is not available', httpStatus.FORBIDDEN))
        return null
      }

      return User.findOne({ where: { email } })
        .then(existingUser => {
          if (existingUser) {
            next(
              new APIError(
                translate('api.errors.auth.userExistsAlready'),
                httpStatus.BAD_REQUEST
              )
            )
            return null
          }

          return User.create(fields, { returning: true })
            .then(user => {
              return checkout(user)
                .then(data => {
                  sendAdminRegistrationNotification({
                    user,
                  })
                  res.json(data)
                })
                .catch(err => next(err))
            })
            .catch(err => next(err))
        })
    })
}

function login(req, res, next) {
  const { email, password } = req.body

  return User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        next(
          new APIError(
            translate('api.errors.auth.userNotExisting'),
            httpStatus.BAD_REQUEST
          )
        )
        return
      }

      if (!user.comparePasswords(password)) {
        next(
          new APIError(
            translate('api.errors.auth.invalidCredentials'),
            httpStatus.BAD_REQUEST
          )
        )
        return
      }

      res.json({
        data: user,
        message: 'ok',
        token: generateToken(user),
      })
    })
    .catch(err => next(err))
}

function requestResetToken(req, res, next) {
  const { email } = req.body
  const queryParams = {
    where: {
      email,
    },
    limit: 1,
    returning: true,
  }

  generateRandomHash().then(passwordResetToken => {
    const passwordResetAt = db.fn('NOW')

    return getConfig('baseUrl')
      .then(config => {
        return User.update({ passwordResetAt, passwordResetToken }, queryParams)
          .then(data => {
            if (data[0] === 0) {
              next(
                new APIError(
                  translate('api.errors.auth.userNotExisting'),
                  httpStatus.BAD_REQUEST
                )
              )
              return
            }

            const user = data[1][0]
            const passwordResetUrl = `${config.baseUrl}/reset/${passwordResetToken}`

            sendPasswordReset({
              passwordResetUrl,
              user,
            }, user.email)

            res.json({
              message: 'ok',
            })
          })
          .catch(err => next(err))
      })
  })
}

function resetPassword(req, res, next) {
  const { token, password } = req.body
  const queryParams = {
    where: {
      passwordResetAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date() - PASSWORD_RESET_EXPIRY * 60000),
      },
      passwordResetToken: token,
    },
    limit: 1,
    returning: true,
  }

  const passwordResetToken = null

  return User.update({ password, passwordResetToken }, queryParams)
    .then(data => {
      if (data[0] === 0) {
        next(
          new APIError(
            translate('api.errors.auth.invalidResetToken'),
            httpStatus.BAD_REQUEST
          )
        )
        return
      }

      res.json({
        message: 'ok',
      })
    })
    .catch(err => next(err))
}

export default {
  login,
  paypalCheckoutCancel,
  paypalCheckoutSuccess,
  requestResetToken,
  resetPassword,
  signup,
}
