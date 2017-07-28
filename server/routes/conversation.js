import express from 'express'
import validate from 'express-validation'

import conversationController from '../controllers/conversation'
import conversationValidation from '../validation/conversation'
import messageController from '../controllers/message'
import messageValidation from '../validation/message'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    conversationController.findAll
  )
  .post(
    validate(conversationValidation.createConversation),
    conversationController.create
  )

router.route('/:resourceId')
  .get(
    conversationController.findOne
  )

router.route('/:resourceId/messages')
  .get(
    messageController.findAll
  )
  .post(
    validate(messageValidation.createMessage),
    messageController.create
  )

export default router
