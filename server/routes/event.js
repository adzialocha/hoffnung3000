import express from 'express'
import validate from 'express-validation'

import eventController from '../controllers/event'
import eventValidation from '../validation/event'

import { canCreate, canUpdate, canDelete } from '../middlewares/roles'
import { grantWhenFestivalFree } from '../middlewares/authorizeFreeFestival'
import { authorizeJWT } from '../middlewares/authorizeJWT'
import { getUserWhenAuthenticated } from '../middlewares/getUserWhenAuthenticated'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    grantWhenFestivalFree,
    getUserWhenAuthenticated,
    eventController.findAll
  )
  .post(
    authorizeJWT,
    canCreate,
    validate(eventValidation.createEvent),
    eventController.create
  )

router.route('/:resourceSlug')
  .get(
    grantWhenFestivalFree,
    getUserWhenAuthenticated,
    eventController.lookup,
    eventController.findOneWithSlug
  )
  .put(
    authorizeJWT,
    eventController.lookup,
    canUpdate,
    validate(eventValidation.updateEvent),
    eventController.update
  )
  .delete(
    authorizeJWT,
    eventController.lookup,
    canDelete,
    eventController.destroy
  )

export default router
