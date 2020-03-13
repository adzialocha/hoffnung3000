import Joi from 'joi'

export default {
  signup: {
    body: {
      email: Joi.string().email().required(),
      firstname: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(8).required(),
    },
  },
}
