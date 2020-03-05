import httpStatus from 'http-status'

import { APIError } from '../helpers/errors'

function checkRole(checkVisitor, checkParticipant, checkOwner, req, res, next) {
  if (!req.user) {
    return next(
      new APIError('Access forbidden', httpStatus.FORBIDDEN, true)
    )
  }

  if (!req.user.isActive) {
    return next(
      new APIError('Access forbidden', httpStatus.FORBIDDEN, true)
    )
  }

  if (req.user.isAdmin) {
    return next()
  }

  if (checkOwner && ('ownerId' in req) && req.user.id === req.ownerId) {
    return next()
  }

  if (checkParticipant && req.user.isParticipant) {
    return next()
  }

  if (checkVisitor && req.user.isVisitor) {
    return next()
  }

  return next(
    new APIError('Access forbidden', httpStatus.FORBIDDEN, true)
  )
}

export function canRead(req, res, next) {
  return checkRole(false, true, true, req, res, next)
}

export function canReadAsVisitor(req, res, next) {
  return checkRole(true, true, true, req, res, next)
}

export function canCreate(req, res, next) {
  return checkRole(false, true, false, req, res, next)
}

export function canUpdate(req, res, next) {
  return checkRole(false, false, true, req, res, next)
}

export function canDelete(req, res, next) {
  return checkRole(false, false, true, req, res, next)
}

export function onlyAdmin(req, res, next) {
  return checkRole(false, false, false, req, res, next)
}
