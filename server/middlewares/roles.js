import httpStatus from 'http-status'

import { APIError } from '../helpers/errors'

function checkRole(checkParticipant, checkOwner, req, res, next) {
  if (req.user.isAdmin) {
    return next()
  }

  if (checkOwner && req.user.id === req.ownerId) {
    return next()
  }

  if (checkParticipant && req.user.isParticipant) {
    return next()
  }

  return next(new APIError(
    'Access forbidden',
    httpStatus.FORBIDDEN,
    true
  ))
}

export function canRead(req, res, next) {
  return checkRole(true, true, req, res, next)
}

export function canCreate(req, res, next) {
  return checkRole(true, false, req, res, next)
}

export function canUpdate(req, res, next) {
  return checkRole(false, true, req, res, next)
}

export function canDelete(req, res, next) {
  return checkRole(false, true, req, res, next)
}

export function onlyAdmin(req, res, next) {
  return checkRole(false, false, req, res, next)
}
