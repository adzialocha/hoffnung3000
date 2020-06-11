import express from 'express'
import { validate } from 'express-validation'

import meetingController from '../controllers/meeting'
import meetingValidation from '../validation/meeting'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .post(
    validate(meetingValidation.requestRandomMeeting),
    meetingController.requestRandomMeeting
  )

export default router
