import express from 'express'
import validate from 'express-validation'

import userController from '../controllers/user'
import userValidation from '../validation/user'
import { canRead, canUpdate, canDelete } from '../middlewares/roles'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(canRead, userController.findAll)

router.route('/:resourceId')
  .get(userController.lookup, canRead, userController.findOne)
  .put(
    userController.lookup,
    canUpdate,
    validate(userValidation.updateUser),
    userController.update
  )
  .delete(userController.lookup, canDelete, userController.destroy)

export default router
