import dateFns from 'date-fns'
import httpStatus from 'http-status'

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  prepareAnimalResponseAll,
} from './base'

import Animal from '../models/animal'
import Conversation, {
  ConversationBelongsToManyAnimal,
  ConversationHasManyMessage,
} from '../models/conversation'
import Message from '../models/message'

import pick from '../utils/pick'
import { APIError } from '../helpers/errors'

const permittedFields = [
  'text',
  'title',
]

function prepareResponse(conversation, req) {
  const response = conversation.toJSON()

  if (response.animals) {
    response.animals = prepareAnimalResponseAll(response.animals)
  }

  if (response.messages) {
    response.lastMessage = response.messages[0]
    delete response.messages

    const animalMe = (
      req.conversation ? req.conversation.animals[0] : conversation.animals[0]
    )
    const lastCheckedAt = animalMe.conversationsAnimals.updatedAt
    response.isRead = dateFns.isAfter(
      lastCheckedAt,
      response.lastMessage.createdAt
    )
  }

  return response
}

function prepareResponseAll(rows, req) {
  return rows.map(row => prepareResponse(row, req))
}

export default {
  create: (req, res, next) => {
    const values = pick(permittedFields, req.body)
    const animalIds = req.body.animalIds

    // get all receiving animals
    return Animal.findAll({
      where: {
        id: {
          $in: animalIds,
        },
      },
    }, {
      returning: true,
    })
      .then(receivingAnimals => {
        // check if receiving animal is not myself
        const isMyself = receivingAnimals.find(animal => {
          return animal.userId === req.user.id
        })

        if (isMyself) {
          next(
            new APIError(
              'You can\'t send a message to yourself',
              httpStatus.BAD_REQUEST
            )
          )
          return null
        }

        // are all receiving animals given?
        if (receivingAnimals.length !== animalIds.length) {
          next(
            new APIError(
              'One of the receiving animals does not exist',
              httpStatus.BAD_REQUEST
            )
          )
          return null
        }

        // create an animal for myself (the sending user)
        return Animal.create({
          userId: req.user.id,
        }, {
          returning: true,
        })
          .then(sendingAnimal => {
            const animals = receivingAnimals.concat([sendingAnimal])

            // create the new conversation
            return Conversation.create({
              title: values.title,
              animalId: sendingAnimal.id,
            })
              .then(conversation => {
                return conversation.setAnimals(animals)
                  .then(() => {
                    // create first message in conversation
                    return Message.create({
                      animalId: sendingAnimal.id,
                      conversationId: conversation.id,
                      text: values.text,
                    })
                      .then(() => {
                        res.json({ status: 'ok' })
                      })
                  })
              })
          })
      })
      .catch(err => next(err))
  },
  findAll: (req, res, next) => {
    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = req.query

    return Conversation.findAndCountAll({
      distinct: true,
      include: [
        {
          association: ConversationBelongsToManyAnimal,
          where: {
            userId: req.user.id,
          },
        },
        {
          association: ConversationHasManyMessage,
          group: 'conversationId',
        },
      ],
      limit,
      offset,
      order: [
        [ConversationHasManyMessage, 'createdAt', 'DESC'],
      ],
    })
      .then(result => {
        res.json({
          data: prepareResponseAll(result.rows, req),
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          total: result.count,
        })
      })
      .catch(err => next(err))
  },
  lookup: (req, res, next) => {
    return Conversation.findById(req.params.resourceId, {
      include: [
        {
          association: ConversationBelongsToManyAnimal,
          through: {
            attributes: [
              'updatedAt',
            ],
          },
          where: {
            userId: req.user.id,
          },
        },
      ],
      rejectOnEmpty: true,
    })
      .then(conversation => {
        req.conversation = conversation
        next()
        return null
      })
      .catch(err => next(err))
  },
  findOne: (req, res, next) => {
    return Conversation.findById(req.params.resourceId, {
      include: [
        ConversationBelongsToManyAnimal,
      ],
      rejectOnEmpty: true,
    })
      .then(conversation => res.json(prepareResponse(conversation, req)))
      .catch(err => next(err))
  },
}
