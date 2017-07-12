import httpStatus from 'http-status'

import checkout from '../services/checkout'
import config from '../../config'
import db from '../database'
import pick from '../utils/pick'
import User from '../models/user'
import { APIError } from '../helpers/errors'
import { executePayment } from '../services/paypal'
import { generateRandomHash } from '../utils/randomHash'
import { generateToken } from '../services/passport'
import {
  sendAdminRegistrationNotification,
  sendPasswordReset,
  sendRegistrationComplete,
} from '../helpers/mailTemplate'

const PASSWORD_RESET_EXPIRY = 15 // min

const permittedFields = [
  'city',
  'cityCode',
  'country',
  'email',
  'firstname',
  'lastname',
  'password',
  'paymentMethod',
  'phone',
  'street',
]

const product = {
  name: config.title,
  description: 'Participation fee',
  price: config.participationPrice,
}

function signup(req, res, next) {
  const fields = pick(permittedFields, req.body)
  fields.isParticipant = true

  const { email, paymentMethod } = fields

  User.count({ where: { isParticipant: true } })
    .then(count => {
      if (count >= config.maximumParticipantsCount) {
        next(
          new APIError(
            'Registration limit was exceeded',
            httpStatus.LOCKED
          )
        )
        return
      }

      User.findOne({ where: { email } })
        .then(existingUser => {
          if (existingUser) {
            next(
              new APIError(
                'A user with this email address already exists',
                httpStatus.BAD_REQUEST
              )
            )
            return
          }

          User.create(fields, { returning: true })
            .then((user) => {
              return checkout(paymentMethod, user, product)
                .then((data) => {
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

  User.findOne(queryParams)
    .then((user) => {
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
          new APIError('Payment error', httpStatus.INTERNAL_SERVER_ERROR)
        ))
    })
    .catch(() => next(
      new APIError('Invalid payment error', httpStatus.BAD_REQUEST)
    ))
}

function paypalCheckoutCancel(req, res) {
  res.redirect('/?paypalCancel')
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

      return res.json({
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

  generateRandomHash().then((passwordResetToken) => {
    const passwordResetAt = db.sequelize.fn('NOW')
    User.update({ passwordResetAt, passwordResetToken }, queryParams)
      .then((data) => {
        if (data[0] === 0) {
          return next(
            new APIError('User does not exist', httpStatus.BAD_REQUEST)
          )
        }

        const user = data[1][0]
        const passwordResetUrl = `${config.basePath}/reset/${passwordResetToken}`

        sendPasswordReset({
          passwordResetUrl,
          user,
        }, user.email)

        return res.json({
          message: 'ok',
        })
      })
      .catch(err => next(err))
  })
}

function resetPassword(req, res, next) {
  const { token, password } = req.body
  const queryParams = {
    where: {
      passwordResetAt: {
        $lt: new Date(),
        $gt: new Date(new Date() - PASSWORD_RESET_EXPIRY * 60000),
      },
      passwordResetToken: token,
    },
    limit: 1,
    returning: true,
  }

  const passwordResetToken = null

  User.update({ password, passwordResetToken }, queryParams)
    .then((data) => {
      if (data[0] === 0) {
        return next(
          new APIError('Expired or invalid token', httpStatus.BAD_REQUEST)
        )
      }

      return res.json({
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
