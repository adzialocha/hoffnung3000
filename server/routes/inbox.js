import express from 'express'
import validate from 'express-validation'

import inboxController from '../controllers/inbox'
import inboxValidation from '../validation/inbox'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    inboxController.findAllConversations
  )
  .post(
    validate(inboxValidation.createConversation),
    inboxController.createConversation
  )

router.route('/:resourceId')
  .get(
    inboxController.findConversation
  )
  .post(
    validate(inboxValidation.createMessage),
    inboxController.createMessage
  )

export default router
