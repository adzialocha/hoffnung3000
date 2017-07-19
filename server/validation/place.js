import Joi from 'joi'

export default {
  createPlace: {
    body: {
      description: Joi.string().min(30).required(),
      title: Joi.string().required().min(3).required(),
    },
  },
  updatePlace: {
    body: {
      description: Joi.string().min(30).required(),
      title: Joi.string().required().min(3).required(),
    },
    params: {
      resourceId: Joi.string().required(),
    },
  },
}
