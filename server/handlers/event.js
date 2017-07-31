import {
  EventBelongsToAnimal,
  EventBelongsToManyImage,
} from '../database/associations'

import { deleteConversationsByAnimalId } from './conversation'
import { deleteImagesForObject } from './image'
import {
  deleteObjects,
  deleteObjectsByIds,
  deleteObjectsByUserId,
} from './base'

import Event from '../models/event'
import Slot from '../models/slot'

const include = [
  {
    association: EventBelongsToAnimal,
    required: true,
  },
  {
    association: EventBelongsToManyImage,
  },
]

function deleteAssociations(events) {
  const promises = events.map(event => {
    return Promise.all([
      deleteConversationsByAnimalId(event.animal.id),
      deleteImagesForObject(event),
      event.animal.destroy(),
      event.destroy(),
      Slot.destroy({
        where: {
          eventId: event.id,
        },
      }),
    ])
  })

  return Promise.all(promises)
}

export function deleteEventsByPlaceId(placeId) {
  return deleteObjects(
    Event,
    { placeId },
    include,
    deleteAssociations
  )
}

export function deleteEventsByUserId(userId) {
  return deleteObjectsByUserId(
    Event,
    userId,
    include,
    deleteAssociations
  )
}

export function deleteEventsByIds(eventIds) {
  return deleteObjectsByIds(
    Event,
    eventIds,
    include,
    deleteAssociations
  )
}
