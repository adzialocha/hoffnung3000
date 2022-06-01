import httpStatus from 'http-status'

import User from '../models/user'
import checkout from '../services/checkout'
import pick from '../../common/utils/pick'
import { APIError } from '../helpers/errors'
import { getConfig } from '../config'
import { sendAdminRegistrationNotification } from '../helpers/mailTemplate'
import { translate } from '../../common/services/i18n'

const permittedFields = [
  'email',
  'username',
  'password',
  'paymentMethod',
]

function signup(req, res, next) {
  const fields = pick(permittedFields, req.body)
  fields.isVisitor = true

  const { email, paymentMethod } = fields

  return getConfig([
    'description',
    'festivalTicketPrice',
    'isSignUpVisitorEnabled',
    'title',
  ])
    .then(config => {
      if (!config.isSignUpVisitorEnabled) {
        next(new APIError('Ticket sales are not available', httpStatus.FORBIDDEN))
        return null
      }

      if (paymentMethod === 'free' && config.festivalTicketPrice !== 0) {
        next(
          new APIError(
            translate('api.errors.auth.unknownPaymentMethod'),
            httpStatus.BAD_REQUEST
          )
        )
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

          const product = {
            name: config.title,
            description: translate('api.products.ticket'),
            price: config.festivalTicketPrice,
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
}

export default {
  signup,
}
