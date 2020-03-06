import express from 'express'
import expressValidation from 'express-validation'
import httpStatus from 'http-status'
import { EmptyResultError, ValidationError } from 'sequelize'

import { APIError } from '../helpers/errors'

import upload from '../middlewares/upload'
import { onlyAdmin } from '../middlewares/roles'
import { authorizeJWT } from '../middlewares/authorizeJWT'

import activityController from '../controllers/activity'
import eventPreviewController from '../controllers/eventPreview'
import metaController from '../controllers/meta'
import pageController from '../controllers/page'
import userStatusController from '../controllers/userStatus'

import authRoutes from './auth'
import configRoutes from './config'
import conversationRoutes from './conversation'
import eventRoutes from './event'
import meetingRoutes from './meeting'
import pageRoutes from './page'
import placeRoutes from './place'
import profileRoutes from './profile'
import resourceRoutes from './resource'
import userRoutes from './user'
import logger from '../helpers/logger'

const router = express.Router() // eslint-disable-line new-cap

// API health check route
router.get('/health-check', (req, res) => res.send('ok'))

// Public API routes
router.use('/auth', authRoutes)

router.route('/pages/:resourceSlug(\\D+)/')
  .get(pageController.findOneWithSlug)

router.route('/meta')
  .get(metaController.getStatusAndConfig)

router.route('/preview')
  .get(eventPreviewController.findAll)

// Public API routes when festivalTicketPrice === 0

router.use('/events', eventRoutes)
router.use('/places', placeRoutes)

// Private API routes
router.use(authorizeJWT)

router.use('/conversations', conversationRoutes)
router.use('/meeting', meetingRoutes)
router.use('/profile', profileRoutes)
router.use('/resources', resourceRoutes)

router.route('/status')
  .get(userStatusController.status)

router.route('/upload')
  .post(upload)

router.route('/activity')
  .get(activityController.findAll)

// Admin API routes
router.use(onlyAdmin)

router.use('/config', configRoutes)
router.use('/pages', pageRoutes)
router.use('/users', userRoutes)

// API error handling
router.use((err, req, res, next) => {
  if (err) {
    logger.error(err.stack)
  }

  if (err instanceof expressValidation.ValidationError) {
    // Validation error contains errors which is an
    // array of error each containing message[]
    const unifiedMessage = err.errors.map(
      error => error.messages.join('. ')
    ).join(' and ')
    const error = new APIError(unifiedMessage, httpStatus.BAD_REQUEST, true)
    return next(error)
  } else if (err instanceof EmptyResultError) {
    const apiError = new APIError(err.message, httpStatus.NOT_FOUND, true)
    return next(apiError)
  } else if (err instanceof ValidationError) {
    const unifiedMessage = err.errors.map(
      error => error.message
    ).join(' and ')
    const apiError = new APIError(unifiedMessage, httpStatus.BAD_REQUEST, true)
    return next(apiError)
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic)
    return next(apiError)
  }

  return next(err)
})

router.use((req, res, next) => {
  const err = new APIError('Route does not exist', httpStatus.NOT_FOUND)
  return next(err)
})

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const error = {
    message: err.message || httpStatus[err.status],
    status: err.status,
  }

  res.status(err.status).json(error)
})

export default router
