import Joi from 'joi'

export default {
  createPerformer: {
    body: {
      description: Joi.string().min(10).max(60).required(),
      title: Joi.string().min(3).required(),
    },
  },
  updatePerformer: {
    body: {
      description: Joi.string().min(10).max(60).required(),
      title: Joi.string().min(3).required(),
    },
    params: {
      resourceSlug: Joi.string().required(),
    },
  },
}
