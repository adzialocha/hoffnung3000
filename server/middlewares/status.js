// Check and set if festival is free for unregistered Visitors

import httpStatus from 'http-status'
import passport from '../services/passport'

import { APIError } from '../helpers/errors'
import { getConfig } from '../config'

function checkStatus(checkUser, checkTicketPrice, req, res, next) {
  if (checkUser && !req.user) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        req.user = false
      }
      req.user = user
      return next()
    })(req, res, next)
  }

  if (checkTicketPrice) {
    getConfig('festivalTicketPrice').then(config => {
      if (config.festivalTicketPrice === 0) {
        req.freeFestival = true
        return next()
      }
      req.freeFestival = false
      return next()
    })
  }
}

export function checkTicketStatus(req, res, next) {
  return checkStatus(false, true, req, res, next)
}

export function checkUserStatus(req, res, next) {
  return checkStatus(true, false, req, res, next)
}