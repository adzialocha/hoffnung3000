import express from 'express'
import expressValidation from 'express-validation'
import httpStatus from 'http-status'
import winston from 'winston'
import { EmptyResultError, ValidationError } from 'sequelize'

import passport from '../services/passport'
import { APIError } from '../helpers/errors'
import { onlyAdmin } from '../middlewares/roles'

import metaController from '../controllers/meta'
import pageController from '../controllers/page'

import authRoutes from './auth'
import itemRoutes from './item'
import pageRoutes from './page'
import performerRoutes from './performer'
import placeRoutes from './place'
import profileRoutes from './profile'
import userRoutes from './user'

const router = express.Router() // eslint-disable-line new-cap

// API health check route

router.get('/health-check', (req, res) =>
  res.send('ok')
)

// public API routes

router.use('/auth', authRoutes)

router.route('/pages/:resourceSlug(\\D+)/')
  .get(pageController.findOneWithSlug)

router.route('/meta')
  .get(metaController.information)

// private API routes

router.use(
  '/*',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    next()
  }
)

router.use('/profile', profileRoutes)

router.use('/places', placeRoutes)
router.use('/items', itemRoutes)
router.use('/performers', performerRoutes)

// admin API routes

router.use(onlyAdmin)

router.use('/pages', pageRoutes)
router.use('/users', userRoutes)

// API error handling

router.use((err, req, res, next) => {
  if (err && process.env.NODE_ENV === 'development') {
    winston.error(err)
  }

  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an
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
