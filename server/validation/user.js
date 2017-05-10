import Joi from 'joi'

export default {
  createUser: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    },
  },
  updateUser: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    params: {
      resourceId: Joi.string().hex().required(),
    },
  },
}
