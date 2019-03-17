import httpStatus from 'http-status'

import User from '../models/user'
import { APIError } from '../helpers/errors'
import { createPayment } from '../services/paypal'
import { generateRandomString } from '../utils/randomHash'
import { sendWireTransferDetails, sendRegistrationComplete } from '../helpers/mailTemplate'
import { translate } from '../../common/services/i18n'

function generateRandomPaymentId() {
  return generateRandomString(5).toUpperCase()
}

function paypalCheckout(user, product) {
  return new Promise((resolve, reject) => {
    createPayment(product)
      .then(paypalResponse => {
        return User.update({
          paymentId: paypalResponse.payment.id,
        }, {
          where: { id: user.id },
          limit: 1,
        })
          .then(() => {
            resolve({
              message: 'ok',
              redirect: paypalResponse.redirect,
            })
          })
          .catch(userUpdateError => reject(userUpdateError))
      })
      .catch(() => {
        return User.destroy({ where: { id: user.id }, limit: 1 })
          .then(() => {
            reject(
              new APIError(
                translate('api.errors.auth.paymentError'),
                httpStatus.INTERNAL_SERVER_ERROR
              )
            )
          })
          .catch(userDestroyError => reject(userDestroyError))
      })
  })
}

function transferCheckout(user, product) {
  return new Promise((resolve, reject) => {
    const paymentId = generateRandomPaymentId()

    User.update({
      paymentId,
    }, {
      where: { id: user.id },
      limit: 1,
      returning: true,
    })
      .then(data => {
        const updatedUser = data[1][0]

        sendWireTransferDetails({
          paymentId,
          product,
          user: updatedUser,
        }, updatedUser.email)

        resolve({
          message: 'ok',
        })
      })
      .catch(err => reject(err))
  })
}

function freeCheckout(user) {
  return new Promise((resolve, reject) => {
    User.update({
      isActive: true,
    }, {
      where: { id: user.id },
      limit: 1,
      returning: true,
    })
      .then(data => {
        const updatedUser = data[1][0]

        sendRegistrationComplete({
          user: updatedUser,
        }, updatedUser.email)

        resolve({
          message: 'ok',
        })
      })
      .catch(err => reject(err))
  })
}

export default function checkout(paymentMethod, user, product) {
  if (paymentMethod === 'paypal') {
    return paypalCheckout(user, product)
  } else if (paymentMethod === 'transfer') {
    return transferCheckout(user, product)
  } else if (paymentMethod === 'free') {
    return freeCheckout(user)
  }

  return Promise.reject(
    new APIError(
      translate('api.errors.auth.paymentMethodError'),
      httpStatus.BAD_REQUEST
    )
  )
}
