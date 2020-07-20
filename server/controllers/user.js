import {
  create,
  findAll,
  findOne,
  update,
} from './base'

import { deleteUsersByIds } from '../handlers/user'

import User from '../models/user'

const permittedFields = [
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
]

export default {
  create: (req, res, next) => {
    return create(User, permittedFields, req, res, next)
  },
  destroy: (req, res, next) => {
    return deleteUsersByIds([req.params.resourceId])
      .then(() => {
        res.json({ message: 'ok' })
      })
      .catch(err => next(err))
  },
  findAll: (req, res, next) => {
    return findAll(User, req, res, next)
  },
  findOne: (req, res, next) => {
    return findOne(User, req, res, next)
  },
  update: (req, res, next) => {
    return update(User, permittedFields, req, res, next)
  },
}
