import { Joi } from 'express-validation'

export default {
  signup: {
    body: Joi.object({
      city: Joi.string().required(),
      cityCode: Joi.string().required(),
      country: Joi.string().required(),
      email: Joi.string().email().required(),
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(8).required(),
      paymentMethod: Joi.string().allow('paypal', 'transfer').required(),
      phone: Joi.string().required(),
      street: Joi.string().required(),
    }),
  },
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  requestResetToken: {
    body: Joi.object({
      email: Joi.string().email().required(),
    }),
  },
  resetPassword: {
    body: Joi.object({
      password: Joi.string().min(8).required(),
      token: Joi.string().required(),
    }),
  },
}
