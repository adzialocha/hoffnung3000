import Joi from 'joi'

export default {
  createPage: {
    body: {
      slug: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    },
  },
  updatePage: {
    body: {
      slug: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    },
    params: {
      resourceId: Joi.string().required(),
    },
  },
}
