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

router.route('/:resourceSlug')
  .get(
    placeController.lookupWithSlug,
    canRead,
    placeController.findOneWithSlug
  )

export default router
