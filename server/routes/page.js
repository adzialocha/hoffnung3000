import express from 'express'
import validate from 'express-validation'

import pageController from '../controllers/page'
import pageValidation from '../validation/page'
import { onlyAdmin } from '../middlewares/roles'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    onlyAdmin,
    pageController.findAll
  )
  .post(
    onlyAdmin,
    validate(pageValidation.createPage),
    pageController.create
  )

router.route('/:resourceId')
  .get(
    onlyAdmin,
    pageController.findOne
  )
  .put(
    onlyAdmin,
    validate(pageValidation.updatePage),
    pageController.update
  )
  .delete(
    onlyAdmin,
    pageController.destroy
  )

export default router
