import Joi from 'joi'

export default {
  createUser: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  },
  updateUser: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    params: {
      userId: Joi.string().hex().required(),
    },
  },
}
