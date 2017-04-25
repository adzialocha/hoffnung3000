import Joi from 'joi'

export default {
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
}
