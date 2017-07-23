import express from 'express'
import validate from 'express-validation'

import placeController from '../controllers/place'
import placeSlotsController from '../controllers/placeSlots'
import placeValidation from '../validation/place'

import { canRead, canCreate, canUpdate, canDelete } from '../middlewares/roles'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    canRead,
    placeController.findAll
  )
  .post(
    canCreate,
    validate(placeValidation.createPlace),
    placeController.create
  )

router.route('/:resourceSlug')
  .get(
    placeController.lookupWithSlug,
    canRead,
    placeController.findOneWithSlug
  )
  .put(
    placeController.lookupWithSlug,
    canUpdate,
    validate(placeValidation.updatePlace),
    placeController.updateWithSlug
  )
  .delete(
    placeController.lookupWithSlug,
    canDelete,
    placeController.destroyWithSlug
  )

router.route('/:resourceSlug/slots')
  .get(
    placeController.lookupWithSlug,
    canRead,
    placeSlotsController.findAll
  )

export default router
