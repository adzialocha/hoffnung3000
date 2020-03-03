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
      socialMedia: Joi.string().min(3),
      ticketUrl: Joi.string().min(3),
      title: Joi.string().min(3).required(),
      websiteUrl: Joi.string().min(3),
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
      socialMedia: Joi.string().min(3),
      ticketUrl: Joi.string().min(3),
      title: Joi.string().min(3).required(),
      websiteUrl: Joi.string().min(3),
    },
    params: {
      resourceSlug: Joi.string().required(),
    },
  },
}
