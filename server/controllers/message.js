import marked from 'marked'
import { DateTime } from 'luxon'

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  prepareAnimalResponse,
} from './base'

import db from '../database'
import pick from '../utils/pick'

import ConversationAnimal from '../models/conversationAnimal'
import Message from '../models/message'
import { MessageBelongsToAnimal, AnimalBelongsToUser } from '../database/associations'
import { addMessageActivity } from '../services/activity'
import { getConfig } from '../config'

const permittedFields = [
  'text',
]

function prepareResponse(message, req, isAnonymous) {
  const response = message.toJSON()
  const animalMe = req.meAnimal

  response.isWrittenByMe = (
    animalMe.userId === req.user.id &&
    animalMe.id === message.animal.id
  )

  const lastCheckedAt = animalMe.conversationsAnimals.updatedAt.toISOString()
  if (response.animal.id === animalMe.id) {
    response.isRead = true
  } else {
    response.isRead = DateTime.fromISO(lastCheckedAt) > DateTime.fromISO(response.createdAt.toISOString())
  }

  response.textHtml = marked(response.text)

  if (response.animal) {
    response.animal = prepareAnimalResponse(response.animal, isAnonymous)
  }

  return response
}

function prepareResponseAll(rows, req, isAnonymous) {
  return rows.map(row => prepareResponse(row, req, isAnonymous))
}

export default {
  create: (req, res, next) => {
    const values = pick(permittedFields, req.body)

    // Create a message in that conversation
    return Message.create({
      animalId: req.meAnimal.id,
      conversationId: req.conversation.id,
      text: values.text,
    })
      .then(() => {
        return addMessageActivity({
          sendingAnimal: req.meAnimal,
          receivingAnimals: req.otherAnimals,
        })
      })
      .then(() => {
        res.json({ status: 'ok' })
      })
      .catch(err => next(err))
  },
  findAll: (req, res, next) => {
    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = req.query

    return getConfig(['isAnonymizationEnabled']).then(config => {
      // Find related conversation
      return Message.findAndCountAll({
        where: {
          conversationId: req.params.resourceId,
        },
        include: [
          {
            association: MessageBelongsToAnimal,
            include: AnimalBelongsToUser,
          },
        ],
        limit,
        offset,
        order: [
          ['createdAt', 'DESC'],
        ],
      })
        .then(result => {
          // Update last checked at date
          return ConversationAnimal.update({
            lastCheckedAt: db.fn('NOW'),
          }, {
            where: {
              animalId: req.meAnimal.id,
              conversationId: req.conversation.id,
            },
          })
            .then(() => {
              // Return messages
              res.json({
                data: prepareResponseAll(
                  result.rows,
                  req,
                  config.isAnonymizationEnabled
                ),
                limit: parseInt(limit, 10),
                offset: parseInt(offset, 10),
                total: result.count,
              })
            })
        })
        .catch(err => next(err))
    })
  },
}
