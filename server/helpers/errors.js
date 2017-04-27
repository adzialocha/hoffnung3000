import httpStatus from 'http-status'

class BaseError extends Error {
  constructor(message, status, isPublic) {
    super(message)

    this.name = this.constructor.name
    this.message = message

    if (status && status > 0) {
      this.status = status
    } else {
      this.status = httpStatus.INTERNAL_SERVER_ERROR
    }

    this.isPublic = isPublic

    Error.captureStackTrace(this, this.constructor.name)
  }
}

export class APIAuthError extends BaseError {
  constructor(message, status = httpStatus.UNAUTHORIZED, isPublic = false) {
    super(message, status, isPublic)
  }
}

export class APIError extends BaseError {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic)
  }
}
