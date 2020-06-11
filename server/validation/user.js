import { Joi } from 'express-validation'

export default {
  createUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(8).required(),
    }),
  },
  updateUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().min(3).max(30).required(),
    }),
    params: Joi.object({
      resourceId: Joi.string().hex().required(),
    }),
  },
}
