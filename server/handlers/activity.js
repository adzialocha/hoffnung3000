import { Op } from 'sequelize'

import { prepareAnimalResponse } from '../controllers/base'

import {
  ActivityBelongsToAnimal,
  ActivityBelongsToEvent,
  ActivityBelongsToPlace,
  ActivityBelongsToResource,
  ActivityRequestBelongsToEvent,
  AnimalBelongsToUser,
} from '../database/associations'

import Activity from '../models/activity'

import { getConfig } from '../config'

function prepareResponse(conversation, isAnonymous) {
  const response = conversation.toJSON()
  const { id, createdAt, type, objectTitle, objectType } = response

  let item

  if (objectType === 'resource') {
    item = response.resource
  } else if (objectType === 'event') {
    item = response.event
  } else if (objectType === 'place') {
    item = response.place
  }

  const object = item ? Object.assign({}, {
    id: item.id,
    slug: item.slug,
    title: item.title,
  }) : null

  const event = response.requestedEvent ? Object.assign({}, {
    id: response.requestedEvent.id,
    slug: response.requestedEvent.slug,
    title: response.requestedEvent.title,
  }) : null

  const animal = prepareAnimalResponse(response.animal, isAnonymous)

  return Object.assign({}, {
    animal,
    createdAt,
    event,
    id,
    object,
    objectTitle,
    objectType,
    type,
  })
}

export function prepareResponseAll(rows, isAnonymous) {
  return rows.map(row => prepareResponse(row, isAnonymous))
}

export function getMyActivities(limit, offset, userId) {
  return new Promise((resolve, reject) => {
    return getConfig('isAnonymizationEnabled').then(config => {
      Activity.findAndCountAll({
        include: [
          {
            association: ActivityBelongsToAnimal,
            include: AnimalBelongsToUser,
          },
          ActivityBelongsToEvent,
          ActivityBelongsToPlace,
          ActivityBelongsToResource,
          ActivityRequestBelongsToEvent,
        ],
        limit,
        offset,
        order: [
          ['createdAt', 'DESC'],
        ],
        where: {
          userId: {
            [Op.or]: [
              null,
              userId,
            ],
          },
        },
      })
        .then(result => {
          resolve({
            data: prepareResponseAll(
              result.rows,
              config.isAnonymizationEnabled
            ),
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            total: result.count,
          })
        })
        .catch(err => reject(err))
    })
  })
}
