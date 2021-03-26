import { Joi } from 'express-validation'

export default {
  createPage: {
    body: Joi.object({
      slug: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    }),
  },
  updatePage: {
    body: Joi.object({
      slug: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    }),
    params: Joi.object({
      resourceId: Joi.string().required(),
    }),
  },
}
