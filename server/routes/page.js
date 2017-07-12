import express from 'express'
import validate from 'express-validation'

import pageAdminController from '../controllers/pageAdmin'
import pageValidation from '../validation/page'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    pageAdminController.findAll
  )
  .post(
    validate(pageValidation.createPage),
    pageAdminController.create
  )

router.route('/:resourceId(\\d+)/')
  .get(
    pageAdminController.findOne
  )
  .put(
    validate(pageValidation.updatePage),
    pageAdminController.update
  )
  .delete(
    pageAdminController.destroy
  )

export default router
