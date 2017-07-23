import express from 'express'
import validate from 'express-validation'

import eventController from '../controllers/event'
import eventValidation from '../validation/event'

import { canRead, canCreate, canUpdate, canDelete } from '../middlewares/roles'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    canRead,
    eventController.findAll
  )
  .post(
    canCreate,
    validate(eventValidation.createEvent),
    eventController.create
  )

router.route('/:resourceSlug')
  .get(
    eventController.lookup,
    canRead,
    eventController.findOneWithSlug
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

export default router
