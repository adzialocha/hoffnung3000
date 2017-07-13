import express from 'express'
import validate from 'express-validation'

import placeController from '../controllers/place'
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

router.route('/:resourceId')
  .get(
    placeController.lookup,
    canRead,
    placeController.findOne
  )
  .put(
    placeController.lookup,
    canUpdate,
    validate(placeValidation.updatePlace),
    placeController.update
  )
  .delete(
    placeController.lookup,
    canDelete,
    placeController.destroy
  )

export default router
