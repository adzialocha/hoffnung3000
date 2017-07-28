import Joi from 'joi'

export default {
  createMessage: {
    body: {
      text: Joi.string().required(),
    },
    params: {
      resourceId: Joi.number().required(),
    },
  },
}
