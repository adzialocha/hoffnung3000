import Joi from 'joi'

export default {
  createUser: {
    body: {
      city: Joi.string().required(),
      cityCode: Joi.string().required(),
      country: Joi.string().required(),
      email: Joi.string().email().required(),
      firstname: Joi.string().alphanum().min(3).max(30).required(),
      lastname: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().min(8).required(),
      phone: Joi.string().required(),
      street: Joi.string().required(),
    },
  },
  updateUser: {
    body: {
      city: Joi.string().required(),
      cityCode: Joi.string().required(),
      country: Joi.string().required(),
      email: Joi.string().email().required(),
      firstname: Joi.string().alphanum().min(3).max(30).required(),
      lastname: Joi.string().alphanum().min(3).max(30).required(),
      phone: Joi.string().required(),
      street: Joi.string().required(),
    },
    params: {
      resourceId: Joi.string().hex().required(),
    },
  },
}
