import { Joi } from 'express-validation'

export default {
  createConversation: {
    body: Joi.object({
      animalIds: Joi.array().min(1).items(Joi.number()).required(),
      title: Joi.string().min(3).required(),
    }),
  },
}
