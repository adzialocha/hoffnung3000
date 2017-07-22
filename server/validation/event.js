import Joi from 'joi'

export default {
  createEvent: {
    body: {
      description: Joi.string().min(20).required(),
      isPublic: Joi.boolean().required(),
      items: Joi.array().items(Joi.number()).required(),
      performers: Joi.array().items(Joi.number()).required(),
      placeId: Joi.number().required(),
      slots: Joi.array().min(1).unique().items(Joi.number()).required(),
      title: Joi.string().min(3).required(),
    },
  },
  updateEvent: {
    body: {
      description: Joi.string().min(20).required(),
      isPublic: Joi.boolean().required(),
      items: Joi.array().items(Joi.number()).required(),
      performers: Joi.array().items(Joi.number()).required(),
      placeId: Joi.number().required(),
      slots: Joi.array().min(1).unique().items(Joi.number()).required(),
      title: Joi.string().min(3).required(),
    },
    params: {
      resourceSlug: Joi.string().required(),
    },
  },
}
