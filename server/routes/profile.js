import express from 'express'
import { validate } from 'express-validation'

import profileController from '../controllers/profile'
import profileValidation from '../validation/profile'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .put(
    validate(profileValidation.updateProfile),
    profileController.update
  )

export default router
