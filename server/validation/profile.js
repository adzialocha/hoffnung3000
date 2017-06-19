import Joi from 'joi'

export default {
  updateProfile: {
    body: {
      newPassword: Joi.string().min(8).required(),
      password: Joi.string().required(),
    },
  },
}
