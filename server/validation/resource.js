import { Joi } from 'express-validation'

export default {
  findAll: {
    query: Joi.object({
      eventId: Joi.number(),
      from: Joi.string().isoDate(),
      to: Joi.string().isoDate(),
    }),
  },
  createResource: {
    body: Joi.object({
      description: Joi.string().min(10).max(120).required(),
      images: Joi.array().max(1),
      title: Joi.string().min(3).required(),
    }),
  },
  updateResource: {
    body: Joi.object({
      description: Joi.string().min(10).max(120).required(),
      images: Joi.array().max(1),
      title: Joi.string().min(3).required(),
    }),
    params: Joi.object({
      resourceSlug: Joi.string().required(),
    }),
  },
}
