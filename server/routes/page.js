import express from 'express'
import validate from 'express-validation'

import pageController from '../controllers/page'
import pageValidation from '../validation/page'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    pageController.findAll
  )
  .post(
    validate(pageValidation.createPage),
    pageController.create
  )

router.route('/:resourceId')
  .get(
    pageController.findOne
  )
  .put(
    validate(pageValidation.updatePage),
    pageController.update
  )
  .delete(
    pageController.destroy
  )

export default router
