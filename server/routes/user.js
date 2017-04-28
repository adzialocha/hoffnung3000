import express from 'express'
import validate from 'express-validation'

import userController from '../controllers/user'
import userValidation from '../validation/user'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(userController.findAll)

router.route('/:userId')
  .get(userController.findOne)
  .put(validate(userValidation.updateUser), userController.update)
  .delete(userController.destroy)

export default router
