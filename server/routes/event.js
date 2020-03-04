import express from 'express'
import validate from 'express-validation'

import eventController from '../controllers/event'
import eventValidation from '../validation/event'

import { canReadAsVisitor, canCreate, canUpdate, canDelete } from '../middlewares/roles'
import { checkTicketStatus } from '../middlewares/status'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    checkTicketStatus,
    canReadAsVisitor,
    eventController.findAll
  )  
  .post(
    canCreate,
    validate(eventValidation.createEvent),
    eventController.create
  )
  .put(
    eventController.lookup,
    canUpdate,
    validate(eventValidation.updateEvent),
    eventController.update
  )
  .delete(
    eventController.lookup,
    canDelete,
    eventController.destroy
  )

router.route('/:resourceSlug')
  .get(
    checkTicketStatus,
    eventController.lookup,
    canReadAsVisitor,
    eventController.findOneWithSlug
  )

export default router
