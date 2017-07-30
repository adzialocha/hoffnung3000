import {
  ResourceBelongsToAnimal,
  ResourceBelongsToManyImage,
} from '../database/associations'

import Resource from '../models/resource'

import { deleteImagesForObject } from './image'

export function deleteResources(where) {
  return new Promise((resolve, reject) => {
    Resource.findAll({
      include: [
        {
          association: ResourceBelongsToAnimal,
          required: true,
          where,
        },
        {
          association: ResourceBelongsToManyImage,
        },
      ],
    })
      .then(resources => {
        const removePromises = resources.map(resource => {
          return Promise.all([
            deleteImagesForObject(resource),
            resource.destroy(),
          ])
        })

        return Promise.all(removePromises)
          .then(() => resolve())
      })
      .catch((err) => reject(err))
  })
}
