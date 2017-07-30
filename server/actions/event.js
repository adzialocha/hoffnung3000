import {
  EventBelongsToAnimal,
  EventBelongsToManyImage,
} from '../database/associations'

import Event from '../models/event'
import Slot from '../models/slot'

import { deleteImagesForObject } from './image'

export function deleteEvents(where) {
  return new Promise((resolve, reject) => {
    Event.findAll({
      include: [
        {
          association: EventBelongsToAnimal,
          required: true,
          where,
        },
        {
          association: EventBelongsToManyImage,
        },
      ],
    })
      .then(events => {
        const removePromises = events.map(event => {
          return Promise.all([
            deleteImagesForObject(event),
            event.destroy(),
            Slot.destroy({
              where: {
                eventId: event.id,
              },
            }),
          ])
        })

        return Promise.all(removePromises)
          .then(() => resolve())
      })
      .catch((err) => reject(err))
  })
}
