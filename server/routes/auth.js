import express from 'express'
import validate from 'express-validation'

import authController from '../controllers/auth'
import authValidation from '../validation/auth'
import ticketController from '../controllers/ticket'
import ticketValidation from '../validation/ticket'

const router = express.Router() // eslint-disable-line new-cap

router.route('/signup')
  .post(
    validate(authValidation.signup),
    authController.signup
  )

router.route('/signup/ticket')
  .post(
    validate(ticketValidation.signup),
    ticketController.signup
  )

router.route('/signup/paypal/success')
  .get(
    authController.paypalCheckoutSuccess
  )

router.route('/signup/paypal/cancel')
  .get(
    authController.paypalCheckoutCancel
  )

router.route('/login')
  .post(
    validate(authValidation.login),
    authController.login
  )

router.route('/reset/request')
  .post(
    validate(authValidation.requestResetToken),
    authController.requestResetToken
  )

router.route('/reset')
  .post(
    validate(authValidation.resetPassword),
    authController.resetPassword
  )

export default router
