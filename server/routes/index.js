import express from 'express'
import expressValidation from 'express-validation'
import httpStatus from 'http-status'
import { EmptyResultError } from 'sequelize'
import winston from 'winston'

import passport from '../services/passport'
import { APIError } from '../helpers/errors'

import authRoutes from './auth'
import userRoutes from './user'

const router = express.Router() // eslint-disable-line new-cap

// API health check route

router.get('/health-check', (req, res) =>
  res.send('OK')
)

// API routes

router.use('/auth', authRoutes)

router.use('/*', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  next()
})

router.use('/users', userRoutes)

// API error handling

router.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(
      error => error.messages.join('. ')
    ).join(' and ')
    const error = new APIError(unifiedErrorMessage, err.status, true)
    return next(error)
  } else if (err instanceof EmptyResultError) {
    const apiError = new APIError(err.message, httpStatus.NOT_FOUND, true)
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
  res.status(err.status).json({
    message: err.message || httpStatus[err.status],
    status: err.status,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  })

  if (process.env.NODE_ENV === 'development') {
    winston.error(err)
  }
})

export default router
