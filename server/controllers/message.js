import dateFns from 'date-fns'

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  prepareAnimalResponse,
} from './base'
import db from '../database'

import ConversationAnimal from '../models/conversationAnimal'
import Message, { MessageBelongsToAnimal } from '../models/message'

import pick from '../utils/pick'

const permittedFields = [
  'text',
]

function prepareResponse(message, req) {
  const response = message.toJSON()
  const animalMe = req.conversation.animals[0]

  response.isWrittenByMe = (
    animalMe.userId === req.user.id &&
    animalMe.id === message.animal.id
  )

  const lastCheckedAt = animalMe.conversationsAnimals.updatedAt
  response.isRead = dateFns.isAfter(
    lastCheckedAt,
    response.createdAt
  )

  if (response.animal) {
    response.animal = prepareAnimalResponse(response.animal)
  }

  return response
}

function prepareResponseAll(rows, req) {
  return rows.map(row => prepareResponse(row, req))
}

export default {
  create: (req, res, next) => {
    const values = pick(permittedFields, req.body)

    // create a message in that conversation
    return Message.create({
      animalId: req.conversation.animals[0].id,
      conversationId: req.conversation.id,
      text: values.text,
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

    // find related conversation
    return Message.findAndCountAll({
      where: {
        conversationId: req.params.resourceId,
      },
      include: [
        MessageBelongsToAnimal,
      ],
      limit,
      offset,
      order: [
        ['createdAt', 'DESC'],
      ],
    })
      .then(result => {
        // update last checked at date
        return ConversationAnimal.update({
          lastCheckedAt: db.sequelize.fn('NOW'),
        }, {
          where: {
            animalId: req.conversation.animalId,
            conversationId: req.conversation.id,
          },
        })
          .then(() => {
            // return messages
            res.json({
              data: prepareResponseAll(result.rows, req),
              limit: parseInt(limit, 10),
              offset: parseInt(offset, 10),
              total: result.count,
            })
          })
      })
      .catch(err => next(err))
  },
}
