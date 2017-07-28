import express from 'express'
import validate from 'express-validation'

import conversationController from '../controllers/conversation'
import conversationValidation from '../validation/conversation'
import messageController from '../controllers/message'
import messageValidation from '../validation/message'

import { canRead, canCreate } from '../middlewares/roles'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    canRead,
    conversationController.findAll
  )
  .post(
    canCreate,
    validate(conversationValidation.createConversation),
    conversationController.create
  )

router.route('/:resourceId')
  .get(
    canRead,
    conversationController.findOne
  )

router.route('/:resourceId/messages')
  .get(
    canRead,
    conversationController.lookup,
    messageController.findAll
  )
  .post(
    canCreate,
    validate(messageValidation.createMessage),
    conversationController.lookup,
    messageController.create
  )

export default router
