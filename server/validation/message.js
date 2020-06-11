import { Joi } from 'express-validation'

export default {
  createMessage: {
    body: Joi.object({
      text: Joi.string().required(),
    }),
    params: Joi.object({
      resourceId: Joi.number().required(),
    }),
  },
}
