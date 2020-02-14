import Joi from 'joi'

export default {
  createEvent: {
    body: {
      description: Joi.string().min(20).required(),
      images: Joi.array(),
      isPublic: Joi.boolean().required(),
      placeId: Joi.number().required(),
      resources: Joi.array().items(Joi.number()).required(),
      slots: Joi.array().min(1).unique().items(Joi.number()).required(),
      ticketUrl: Joi.string().min(3),
      title: Joi.string().min(3).required(),
    },
  },
  updateEvent: {
    body: {
      description: Joi.string().min(20).required(),
      images: Joi.array(),
      isPublic: Joi.boolean().required(),
      placeId: Joi.number().required(),
      resources: Joi.array().items(Joi.number()).required(),
      slots: Joi.array().min(1).unique().items(Joi.number()).required(),
      ticketUrl: Joi.string().min(3),
      title: Joi.string().min(3).required(),
    },
    params: {
      resourceSlug: Joi.string().required(),
    },
  },
}
