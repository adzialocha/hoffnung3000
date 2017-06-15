import express from 'express'
import expressValidation from 'express-validation'
import httpStatus from 'http-status'
import winston from 'winston'
import { EmptyResultError, ValidationError } from 'sequelize'

import passport from '../services/passport'
import { APIError } from '../helpers/errors'

import pageController from '../controllers/page'

import authRoutes from './auth'
import pageRoutes from './page'
import userRoutes from './user'

const router = express.Router() // eslint-disable-line new-cap

// API health check route

router.get('/health-check', (req, res) =>
  res.send('OK')
)

// public API routes

router.use('/auth', authRoutes)

router.route('/pages/:resourceId(\\d+)/')
  .get(pageController.findOne)
router.route('/pages/:resourceSlug')
  .get(pageController.findOneWithSlug)

// private API routes

router.use('/*', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  next()
})

router.use('/pages', pageRoutes)
router.use('/users', userRoutes)

// API error handling

router.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(
      error => error.messages.join('. ')
    ).join(' and ')
    const error = new APIError(unifiedErrorMessage, httpStatus.BAD_REQUEST, true)
    return next(error)
  } else if (err instanceof EmptyResultError) {
    const apiError = new APIError(err.message, httpStatus.NOT_FOUND, true)
    return next(apiError)
  } else if (err instanceof ValidationError) {
    const unifiedErrorMessage = err.errors.map(
      error => error.message
    ).join(' and ')
    const apiError = new APIError(unifiedErrorMessage, httpStatus.BAD_REQUEST, true)
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

  if (process.env.NODE_ENV === 'development') {
    winston.error(err)
    error.stack = err.stack
  }

  res.status(err.status).json(error)
})

export default router
