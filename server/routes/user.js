import express from 'express'
import validate from 'express-validation'

import userController from '../controllers/user'
import userValidation from '../validation/user'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    userController.findAll
  )
  .post(
    validate(userValidation.createUser),
    userController.create
  )

router.route('/:resourceId')
  .get(
    userController.findOne
  )
  .put(
    validate(userValidation.updateUser),
    userController.update
  )
  .delete(
    userController.destroy
  )

export default router
