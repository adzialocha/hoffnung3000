import express from 'express'
import validate from 'express-validation'

import authController from '../controllers/auth'
import authValidation from '../validation/auth'

const router = express.Router() // eslint-disable-line new-cap

router.route('/signup')
  .post(validate(authValidation.signup), authController.signup)

router.route('/login')
  .post(validate(authValidation.login), authController.login)

export default router
