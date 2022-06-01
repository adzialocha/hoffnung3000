import httpStatus from 'http-status'
import { Op } from 'sequelize'

import User from '../models/user'
import checkout from '../services/checkout'
import db from '../database'
import pick from '../../common/utils/pick'
import { APIError } from '../helpers/errors'
import { executePayment } from '../services/paypal'
import { generateRandomHash } from '../utils/randomHash'
import { generateToken } from '../services/passport'
import { getConfig } from '../config'
import { translate } from '../../common/services/i18n'

import {
  sendAdminRegistrationNotification,
  sendPasswordReset,
  sendRegistrationComplete,
} from '../helpers/mailTemplate'

const PASSWORD_RESET_EXPIRY = 15 // Minutes

const permittedFields = [
  'email',
  'username',
  'password',
  'paymentMethod',
  'phone',
]

function getProduct(config) {
  return {
    name: config.title,
    description: translate('api.products.participation'),
    price: config.participationPrice,
  }
}

function signup(req, res, next) {
  const fields = pick(permittedFields, req.body)
  fields.isParticipant = true

  const { email, paymentMethod } = fields

  return getConfig([
    'description',
    'isSignUpParticipantEnabled',
    'maximumParticipantsCount',
    'participationPrice',
    'title',
  ])
    .then(config => {
      if (!config.isSignUpParticipantEnabled) {
        next(new APIError('Sign up is not available', httpStatus.FORBIDDEN))
        return null
      }

      if (paymentMethod === 'free' && config.participationPrice !== 0) {
        next(
          new APIError(
            translate('api.errors.auth.paymentMethodError'),
            httpStatus.BAD_REQUEST
          )
        )
        return null
      }

      return User.count({ where: { isParticipant: true } })
        .then(count => {
          if (config.maximumParticipantsCount !== 0 && count >= config.maximumParticipantsCount) {
            next(
              new APIError(
                translate('api.errors.auth.registrationLimitExceeded'),
                httpStatus.LOCKED
              )
            )
            return null
          }

          const product = getProduct(config)

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
                  return checkout(paymentMethod, user, product)
                    .then(data => {
                      sendAdminRegistrationNotification({
                        paymentMethod,
                        product,
                        user,
                      })
                      res.json(data)
                    })
                    .catch(err => next(err))
                })
                .catch(err => next(err))
            })
        })
    })
}

function paypalCheckoutSuccess(req, res, next) {
  const { paymentId, PayerID } = req.query

  const queryParams = {
    where: {
      paymentId,
      paymentMethod: 'paypal',
    },
    limit: 1,
    rejectOnEmpty: true,
  }

  return getConfig(['title', 'description'])
    .then(config => {
      return getProduct(config)
    })
    .then(product => {
      return User
        .findOne(queryParams)
        .then(user => {
          executePayment(paymentId, PayerID)
            .then(() => {
              return User.update({ isActive: true }, queryParams)
                .then(() => {
                  sendRegistrationComplete({
                    product,
                    user,
                  }, user.email)

                  res.redirect('/?paypalSuccess')
                })
                .catch(err => next(err))
            })
            .catch(() => next(
              new APIError(
                translate('api.errors.auth.paymentError'),
                httpStatus.INTERNAL_SERVER_ERROR
              )
            ))
        })
        .catch(() => next(
          new APIError(
            translate('api.errors.auth.paymentMethodError'),
            httpStatus.BAD_REQUEST
          )
        ))
    })
}

function paypalCheckoutCancel(req, res) {
  res.redirect('/?paypalCancel')
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
