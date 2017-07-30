import {
  PlaceBelongsToAnimal,
  PlaceBelongsToManyImage,
} from '../database/associations'

import Event from '../models/event'
import Place from '../models/place'
import Slot from '../models/slot'

import { deleteImagesForObject } from './image'

export function deletePlaces(where) {
  return new Promise((resolve, reject) => {
    Place.findAll({
      include: [
        {
          association: PlaceBelongsToAnimal,
          required: true,
          where,
        },
        {
          association: PlaceBelongsToManyImage,
        },
      ],
    })
      .then(places => {
        const removePromises = places.map(place => {
          return Promise.all([
            deleteImagesForObject(place),
            place.destroy(),
            Slot.destroy({
              where: {
                placeId: place.id,
              },
            }),
            Event.destroy({
              where: {
                placeId: place.id,
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
