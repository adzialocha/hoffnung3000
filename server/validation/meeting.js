import Joi from 'joi'

export default {
  requestRandomMeeting: {
    body: {
      date: Joi.string().isoDate().required(),
      isAnyDate: Joi.boolean().required(),
    },
  },
}
