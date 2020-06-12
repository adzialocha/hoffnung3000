import { Joi } from 'express-validation'

const defaultUser = {
  email: Joi.string().email().required(),
  firstname: Joi.string().min(3).max(30).required(),
  lastname: Joi.string().min(3).max(30).required(),
  city: Joi.string().empty(''),
  cityCode: Joi.string().empty(''),
  country: Joi.string().empty(''),
  phone: Joi.string().empty(''),
  street: Joi.string().empty(''),
  isActive: Joi.boolean(),
  isParticipant: Joi.boolean(),
  isVisitor: Joi.boolean(),
  isAdmin: Joi.boolean(),
}

export default {
  createUser: {
    body: Joi.object({
      ...defaultUser,
      password: Joi.string().min(8).required(),
    }),
  },
  updateUser: {
    body: Joi.object({
      ...defaultUser,
    }),
    params: Joi.object({
      resourceId: Joi.string().hex().required(),
    }),
  },
}
