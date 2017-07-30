import {
  create,
  findAll,
  findOne,
  update,
} from './base'

import { deleteAnimals } from '../actions/animal'
import { deleteConversations } from '../actions/conversation'
import { deleteEvents } from '../actions/event'
import { deletePlaces } from '../actions/place'
import { deleteResources } from '../actions/resource'

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
  create: (req, res, next) => {
    return create(User, permittedFields, req, res, next)
  },
  destroy: (req, res, next) => {
    const userId = req.params.resourceId

    return User.findById(userId, {
      rejectOnEmpty: true,
    })
      .then(user => {
        const where = {
          userId,
        }

        return Promise.all([
          deleteConversations(where),
          deleteResources(where),
          deleteEvents(where),
          deletePlaces(where),
          deleteAnimals(where),
          user.destroy(),
        ])
          .then(() => {
            res.json({ message: 'ok' })
          })
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
