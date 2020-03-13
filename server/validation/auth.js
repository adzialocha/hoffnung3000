import Joi from 'joi'

export default {
  signup: {
    body: {
      email: Joi.string().email().required(),
      firstname: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(8).required(),
    },
  },
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  },
  requestResetToken: {
    body: {
      email: Joi.string().email().required(),
    },
  },
  resetPassword: {
    body: {
      password: Joi.string().min(8).required(),
      token: Joi.string().required(),
    },
  },
}
