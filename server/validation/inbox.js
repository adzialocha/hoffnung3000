import Joi from 'joi'

export default {
  createConversation: {
    body: {
      animalIds: Joi.array().min(1).items(Joi.number()).required(),
      title: Joi.string().min(3).required(),
    },
  },
  createMessage: {
    body: {
      text: Joi.string().min(20).required(),
    },
    params: {
      resourceId: Joi.number().required(),
    },
  },
}
