import {
  ResourceBelongsToAnimal,
  ResourceBelongsToManyImage,
} from '../database/associations'

import Resource from '../models/resource'

import { deleteConversationsByAnimalId } from './conversation'
import { deleteImagesForObject } from './image'
import { deleteObjectsByIds, deleteObjectsByUserId } from './base'

const include = [
  {
    association: ResourceBelongsToAnimal,
    required: true,
  },
  {
    association: ResourceBelongsToManyImage,
  },
]

function deleteAssociations(resources) {
  const promises = resources.map(resource => {
    return Promise.all([
      deleteConversationsByAnimalId(resource.animal.id),
      deleteImagesForObject(resource),
      resource.animal.destroy(),
      resource.destroy(),
    ])
  })

  return Promise.all(promises)
}

export function deleteResourcesByUserId(userId) {
  return deleteObjectsByUserId(
    Resource,
    userId,
    include,
    deleteAssociations
  )
}

export function deleteResourcesByIds(resourceIds) {
  return deleteObjectsByIds(
    Resource,
    resourceIds,
    include,
    deleteAssociations
  )
}
