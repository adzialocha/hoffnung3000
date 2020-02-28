import express from 'express'

import placeController from '../controllers/place'

import { canRead } from '../middlewares/roles'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    canRead,
    placeController.findAll
  )

router.route('/:resourceSlug')
  .get(
    placeController.lookupWithSlug,
    canRead,
    placeController.findOneWithSlug
  )

export default router
