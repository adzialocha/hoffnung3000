import Joi from 'joi'

export default {
  findAll: {
    query: {
      eventId: Joi.number(),
      from: Joi.date().iso(),
      to: Joi.date().iso(),
    },
  },
  createResource: {
    body: {
      description: Joi.string().min(10).max(120).required(),
      images: Joi.array(),
      title: Joi.string().min(3).required(),
    },
  },
  updateResource: {
    body: {
      description: Joi.string().min(10).max(120).required(),
      images: Joi.array(),
      title: Joi.string().min(3).required(),
    },
    params: {
      resourceSlug: Joi.string().required(),
    },
  },
}
