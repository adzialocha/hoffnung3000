import {
  PlaceBelongsToAnimal,
  PlaceBelongsToManyImage,
} from '../database/associations'

import Place from '../models/place'
import Slot from '../models/slot'

import { deleteConversationsByAnimalId } from './conversation'
import { deleteEventsByPlaceId } from './event'
import { deleteImagesForObject } from './image'
import { deleteObjectsByIds, deleteObjectsByUserId } from './base'

const include = [
  {
    association: PlaceBelongsToAnimal,
    required: true,
  },
  {
    association: PlaceBelongsToManyImage,
  },
]

function deleteAssociations(places) {
  const promises = places.map(place => {
    return Promise.all([
      deleteConversationsByAnimalId(place.animal.id),
      deleteImagesForObject(place),
      place.animal.destroy(),
      Slot.destroy({
        where: {
          placeId: place.id,
        },
      }),
      deleteEventsByPlaceId(place.id),
      place.destroy(),
    ])
  })

  return Promise.all(promises)
}

export function deletePlacesByUserId(userId) {
  return deleteObjectsByUserId(
    Place,
    userId,
    include,
    deleteAssociations
  )
}

export function deletePlacesByIds(placeIds) {
  return deleteObjectsByIds(
    Place,
    placeIds,
    include,
    deleteAssociations
  )
}
