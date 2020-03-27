import express from 'express'
import validate from 'express-validation'

import placeController from '../controllers/place'
import placeSlotsController from '../controllers/placeSlots'
import placeValidation from '../validation/place'

import { canRead, canCreate, canUpdate, canDelete } from '../middlewares/roles'
import { grantWhenFestivalFree } from '../middlewares/authorizeFreeFestival'
import { authorizeJWT } from '../middlewares/authorizeJWT'
import { getUserWhenAuthenticated } from '../middlewares/getUserWhenAuthenticated'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    getUserWhenAuthenticated,
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
    getUserWhenAuthenticated,
    grantWhenFestivalFree,
    placeController.lookupWithSlug,
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
