import express from 'express'
import validate from 'express-validation'

import resourceController from '../controllers/resource'
import resourceValidation from '../validation/resource'

import { canRead, canCreate, canUpdate, canDelete } from '../middlewares/roles'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    canRead,
    validate(resourceValidation.findAll),
    resourceController.findAll
  )
  .post(
    canCreate,
    validate(resourceValidation.createResource),
    resourceController.create
  )

router.route('/:resourceSlug')
  .get(
    resourceController.lookup,
    canRead,
    resourceController.findOneWithSlug
  )
  .put(
    resourceController.lookup,
    canUpdate,
    validate(resourceValidation.updateResource),
    resourceController.update
  )
  .delete(
    resourceController.lookup,
    canDelete,
    resourceController.destroy
  )

export default router
