import {
  deleteObjectsByIds,
} from './base'

import { deleteAnimals } from './animal'
import { deleteConversationsByUserId } from './conversation'
import { deleteEventsByUserId } from './event'
import { deletePlacesByUserId } from './place'
import { deleteResourcesByUserId } from './resource'

import User from '../models/user'

function deleteAssociations(users) {
  const promises = users.map(user => {
    return Promise.all([
      deleteConversationsByUserId(user.id),
      deleteResourcesByUserId(user.id),
      deleteEventsByUserId(user.id),
      deletePlacesByUserId(user.id),
      deleteAnimals({ userId: user.id }),
      user.destroy(),
    ])
  })

  return Promise.all(promises)
}

export function deleteUsersByIds(ids) {
  return deleteObjectsByIds(
    User,
    ids,
    [],
    deleteAssociations
  )
}
