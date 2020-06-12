import { Joi } from 'express-validation'

export default {
  updateProfile: {
    body: Joi.object({
      newPassword: Joi.string().min(8).required(),
      password: Joi.string().required(),
    }),
  },
}
