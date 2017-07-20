import Joi from 'joi'

export default {
  createEvent: {
    body: {
      description: Joi.string().min(20).required(),
      title: Joi.string().min(3).required(),
    },
  },
  updateEvent: {
    body: {
      description: Joi.string().min(20).required(),
      title: Joi.string().min(3).required(),
    },
    params: {
      resourceSlug: Joi.string().required(),
    },
  },
}
