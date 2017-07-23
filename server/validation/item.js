import Joi from 'joi'

export default {
  findAll: {
    query: {
      eventId: Joi.number(),
      from: Joi.date().iso(),
      to: Joi.date().iso(),
    },
  },
  createItem: {
    body: {
      description: Joi.string().min(10).max(60).required(),
      title: Joi.string().min(3).required(),
    },
  },
  updateItem: {
    body: {
      description: Joi.string().min(10).max(60).required(),
      title: Joi.string().min(3).required(),
    },
    params: {
      resourceSlug: Joi.string().required(),
    },
  },
}
