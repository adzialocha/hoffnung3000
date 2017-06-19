import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'

import pick from '../utils/pick'
import User from '../models/user'
import { APIError } from '../helpers/errors'
import { createPayment, executePayment } from '../services/paypal'
import {
  sendRegistrationComplete,
  sendWireTransferDetails,
} from '../helpers/mailTemplate'

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

const participantProduct = {
  name: 'HOFFNUNG 3000',
  description: 'Participation fee',
  price: 25.00,
}

const jwtOptions = {
  algorithm: 'HS512',
  expiresIn: '12 hours',
}

function generateToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, jwtOptions)
}

function generateRandomPaymentId() {
  return Math.random().toString(36).substr(2, 5)
}

function paypalCheckout(user) {
  return new Promise((resolve, reject) => {
    createPayment(participantProduct)
      .then((paypalResponse) => {
        User.update({
          paymentId: paypalResponse.payment.id,
        }, {
          where: { id: user.id },
          limit: 1,
          returning: true,
        })
          .then((data) => {
            const updatedUser = data[1][0]
            resolve({
              data: updatedUser,
              message: 'ok',
              redirect: paypalResponse.redirect,
              token: generateToken(updatedUser),
            })
          })
          .catch(userUpdateError => reject(userUpdateError))
      })
      .catch(() => {
        User.destroy({ where: { id: user.id }, limit: 1 })
          .then(() => {
            reject(
              new APIError('Payment error', httpStatus.INTERNAL_SERVER_ERROR)
            )
          })
          .catch(userDestroyError => reject(userDestroyError))
      })
  })
}

function transferCheckout(user) {
  return new Promise((resolve, reject) => {
    const paymentId = generateRandomPaymentId()

    User.update({
      paymentId,
    }, {
      where: { id: user.id },
      limit: 1,
      returning: true,
    })
      .then((data) => {
        const updatedUser = data[1][0]
        sendWireTransferDetails({
          firstname: updatedUser.firstname,
          paymentId,
        }, updatedUser.email)

        resolve({
          data: updatedUser,
          message: 'ok',
          token: generateToken(updatedUser),
        })
      })
      .catch(userUpdateError => reject(userUpdateError))
  })
}

function signup(req, res, next) {
  const fields = pick(permittedFields, req.body)
  fields.isParticipant = true

  const { email, paymentMethod } = fields

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
        .then((newUser) => {
          if (paymentMethod === 'paypal') {
            return paypalCheckout(newUser)
              .then((data) => res.json(data))
              .catch(err => next(err))
          } else if (paymentMethod === 'transfer') {
            return transferCheckout(newUser)
              .then((data) => res.json(data))
              .catch(err => next(err))
          }

          return next(
            new APIError('Unknown payment method', httpStatus.BAD_REQUEST)
          )
        })
        .catch(err => next(err))
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
                firstname: user.firstname,
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

export default {
  login,
  paypalCheckoutCancel,
  paypalCheckoutSuccess,
  signup,
}
