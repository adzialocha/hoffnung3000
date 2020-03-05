import express from 'express'
import validate from 'express-validation'

import placeController from '../controllers/place'
import placeSlotsController from '../controllers/placeSlots'
import placeValidation from '../validation/place'

import { canRead, canCreate, canUpdate, canDelete } from '../middlewares/roles'
import { grantWhenFestivalFree } from '../middlewares/authorizeFreeFestival'
import { authorizeJWT } from '../middlewares/authorizeJWT'
import { checkUser } from '../middlewares/checkUser'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    checkUser,
    grantWhenFestivalFree,
    placeController.findAll
  )
  .post(
    authorizeJWT,
    canCreate,
    validate(placeValidation.createPlace),
    placeController.create
  )

router.route('/:resourceSlug')
  .get(
    checkUser,
    placeController.lookupWithSlug,
    grantWhenFestivalFree,
    placeController.findOneWithSlug
  )
  .put(
    authorizeJWT,
    placeController.lookupWithSlug,
    canUpdate,
    validate(placeValidation.updatePlace),
    placeController.updateWithSlug
  )
  .delete(
    authorizeJWT,
    placeController.lookupWithSlug,
    canDelete,
    placeController.destroyWithSlug
  )

router.route('/:resourceSlug/slots')
  .get(
    authorizeJWT,
    placeController.lookupWithSlug,
    canRead,
    placeSlotsController.findAll
  )

export default router
