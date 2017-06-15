import express from 'express'
import validate from 'express-validation'

import userController from '../controllers/user'
import userValidation from '../validation/user'
import { onlyAdmin } from '../middlewares/roles'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    onlyAdmin,
    userController.findAll
  )
  .post(
    onlyAdmin,
    validate(userValidation.createUser),
    userController.create
  )

router.route('/:resourceId')
  .get(
    onlyAdmin,
    userController.findOne
  )
  .put(
    onlyAdmin,
    validate(userValidation.updateUser),
    userController.update
  )
  .delete(
    onlyAdmin,
    userController.destroy
  )

export default router
