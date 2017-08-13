import Joi from 'joi'

export default {
  requestRandomMeeting: {
    body: {
      date: Joi.date().iso(),
    },
  },
}
