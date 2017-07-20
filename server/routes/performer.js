import express from 'express'
import validate from 'express-validation'

import performerController from '../controllers/performer'
import performerValidation from '../validation/performer'

import { canRead, canCreate, canUpdate, canDelete } from '../middlewares/roles'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    canRead,
    performerController.findAll
  )
  .post(
    canCreate,
    validate(performerValidation.createPerformer),
    performerController.create
  )

router.route('/:resourceSlug')
  .get(
    performerController.lookup,
    canRead,
    performerController.findOneWithSlug
  )
  .put(
    performerController.lookup,
    canUpdate,
    validate(performerValidation.updatePerformer),
    performerController.update
  )
  .delete(
    performerController.lookup,
    canDelete,
    performerController.destroy
  )

export default router
