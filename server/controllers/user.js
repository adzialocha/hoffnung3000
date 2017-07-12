import {
  create,
  destroy,
  findAll,
  findOne,
  findOneWithSlug,
  update,
} from './base'

import User from '../models/user'

const permittedFields = [
  'city',
  'cityCode',
  'country',
  'email',
  'firstname',
  'isActive',
  'isAdmin',
  'isParticipant',
  'isVisitor',
  'lastname',
  'password',
  'passwordResetAt',
  'passwordResetToken',
  'phone',
  'street',
]

export default {
  lookup: (req, res, next) => {
    User.findById(req.params.resourceId, {
      rejectOnEmpty: true,
    })
      .then(user => {
        req.ownerId = user.id
        next()
        return null
      })
      .catch(err => next(err))
  },
  create: (req, res, next) => {
    return create(User, permittedFields, req, res, next)
  },
  destroy: (req, res, next) => {
    return destroy(User, req, res, next)
  },
  findAll: (req, res, next) => {
    return findAll(User, req, res, next)
  },
  findOne: (req, res, next) => {
    return findOne(User, req, res, next)
  },
  findOneWithSlug: (req, res, next) => {
    return findOneWithSlug(User, req, res, next)
  },
  update: (req, res, next) => {
    return update(User, permittedFields, req, res, next)
  },
}
