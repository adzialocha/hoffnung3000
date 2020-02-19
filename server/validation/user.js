import Joi from 'joi'

export default {
  createUser: {
    body: {
      email: Joi.string().email().required(),
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(8).required(),
    },
  },
  updateUser: {
    body: {
      email: Joi.string().email().required(),
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().min(3).max(30).required(),
    },
    params: {
      resourceId: Joi.string().hex().required(),
    },
  },
}
