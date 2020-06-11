import { Joi } from 'express-validation'

export default {
  createEvent: {
    body: Joi.object({
      description: Joi.string().min(20).required(),
      images: Joi.array(),
      isPublic: Joi.boolean().required(),
      placeId: Joi.number().required(),
      resources: Joi.array().items(Joi.number()).required(),
      slots: Joi.array().min(1).unique().items(Joi.number()).required(),
      tags: Joi.array(),
      additionalInfo: Joi.string().allow(''),
      ticketUrl: Joi.string().uri().allow(''),
      title: Joi.string().min(3).required(),
      websiteUrl: Joi.string().uri().allow(''),
    }),
  },
  updateEvent: {
    body: Joi.object({
      description: Joi.string().min(20).required(),
      images: Joi.array(),
      isPublic: Joi.boolean().required(),
      placeId: Joi.number().required(),
      resources: Joi.array().items(Joi.number()).required(),
      slots: Joi.array().min(1).unique().items(Joi.number()).required(),
      tags: Joi.array(),
      additionalInfo: Joi.string().allow(''),
      ticketUrl: Joi.string().uri().allow(''),
      title: Joi.string().min(3).required(),
      websiteUrl: Joi.string().uri().allow(''),
    }),
    params: Joi.object({
      resourceSlug: Joi.string().required(),
    }),
  },
}
