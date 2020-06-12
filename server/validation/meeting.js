import { Joi } from 'express-validation'

export default {
  requestRandomMeeting: {
    body: Joi.object({
      date: Joi.string().isoDate().required(),
      isAnyDate: Joi.boolean().required(),
    }),
  },
}
