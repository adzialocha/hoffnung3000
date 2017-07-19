import express from 'express'
import validate from 'express-validation'

import itemController from '../controllers/item'
import itemValidation from '../validation/item'

import { canRead, canCreate, canUpdate, canDelete } from '../middlewares/roles'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    canRead,
    itemController.findAll
  )
  .post(
    canCreate,
    validate(itemValidation.createItem),
    itemController.create
  )

router.route('/:resourceSlug')
  .get(
    itemController.lookup,
    canRead,
    itemController.findOneWithSlug
  )
  .put(
    itemController.lookup,
    canUpdate,
    validate(itemValidation.updateItem),
    itemController.update
  )
  .delete(
    itemController.lookup,
    canDelete,
    itemController.destroy
  )

export default router
