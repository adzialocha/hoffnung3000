import Joi from 'joi'

export default {
  signup: {
    body: {
      firstname: Joi.string().alphanum().min(3).max(30).required(),
      lastname: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    },
  },
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  },
}
