import express from 'express'

import eventController from '../controllers/event'

import { canReadAsVisitor } from '../middlewares/roles'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  .get(
    canReadAsVisitor,
    eventController.findAll
  )

router.route('/:resourceSlug')
  .get(
    eventController.lookup,
    canReadAsVisitor,
    eventController.findOneWithSlug
  )

export default router
