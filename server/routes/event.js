import express from 'express'
import validate from 'express-validation'

import eventController from '../controllers/event'
import eventValidation from '../validation/event'

import { canReadAsVisitor, canCreate, canUpdate, canDelete } from '../middlewares/roles'
import { grantWhenFestivalFree } from '../middlewares/authorizeFreeFestival'
import { authorizeJWT } from '../middlewares/authorizeJWT'
import { checkUser } from '../middlewares/checkUser'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    checkUser,
    grantWhenFestivalFree,
    eventController.findAll
  )  
  .post(
    authorizeJWT,
    canCreate,
    validate(eventValidation.createEvent),
    eventController.create
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

router.route('/:resourceSlug')
  .get(
    checkUser,
    eventController.lookup,
    grantWhenFestivalFree,
    eventController.findOneWithSlug
  )

export default router
