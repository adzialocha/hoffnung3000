import express from 'express'
import { validate } from 'express-validation'

import metaController from '../controllers/meta'
import configValidation from '../validation/config'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(metaController.getStatusAndSensitiveConfig)

router.route('/')
  .put(
    validate(configValidation.updateConfig),
    metaController.updateConfig
  )

export default router
