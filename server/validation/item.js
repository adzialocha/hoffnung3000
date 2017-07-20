import Joi from 'joi'

export default {
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
