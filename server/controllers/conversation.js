import httpStatus from 'http-status'
import { DateTime } from 'luxon'
import { Op } from 'sequelize'

import pick from '../utils/pick'
import { APIError } from '../helpers/errors'
import { addMessageActivity } from '../services/activity'
import { getConfig } from '../config'

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  prepareAnimalResponseAll,
} from './base'

import {
  AnimalBelongsToUser,
  ConversationBelongsToManyAnimal,
  ConversationHasManyMessage,
} from '../database/associations'

import Animal from '../models/animal'
import Conversation from '../models/conversation'
import Message from '../models/message'

const permittedFields = [
  'text',
  'title',
]

function prepareResponse(conversation, req, isAnonymous) {
  const response = conversation.toJSON()

  if (response.animals) {
    response.animals = prepareAnimalResponseAll(response.animals, isAnonymous)
  }

  if (response.messages) {
    response.lastMessage = response.messages[0]
    delete response.messages

    const animalMe = (
      req.conversation ? req.conversation.animals[0] : conversation.animals[0]
    )
    const lastCheckedAt = animalMe.conversationsAnimals.updatedAt
    if (response.lastMessage.animalId === animalMe.id) {
      response.isRead = true
    } else {
      response.isRead = DateTime.fromISO(lastCheckedAt) > DateTime.fromISO(
        response.lastMessage.createdAt)
    }
  }

  return response
}

function prepareResponseAll(rows, req, isAnonymous) {
  return rows.map(row => prepareResponse(row, req, isAnonymous))
}

export default {
  create: (req, res, next) => {
    const values = pick(permittedFields, req.body)
    const animalIds = req.body.animalIds

    // Get all receiving animals
    return Animal.findAll({
      where: {
        id: {
          [Op.in]: animalIds,
        },
      },
    }, {
      returning: true,
    })
      .then(receivingAnimals => {
        // Check if receiving animal is not myself
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

        // Are all receiving animals given?
        if (receivingAnimals.length !== animalIds.length) {
          next(
            new APIError(
              'One of the receiving animals does not exist',
              httpStatus.BAD_REQUEST
            )
          )
          return null
        }

        // Create an animal for myself (the sending user)
        return Animal.create({
          userId: req.user.id,
        }, {
          returning: true,
        })
          .then(sendingAnimal => {
            const animals = receivingAnimals.concat([sendingAnimal])

            // Create the new conversation
            return Conversation.create({
              title: values.title,
              animalId: sendingAnimal.id,
            })
              .then(conversation => {
                return conversation.setAnimals(animals)
                  .then(() => {
                    // Create first message in conversation
                    return Message.create({
                      animalId: sendingAnimal.id,
                      conversationId: conversation.id,
                      text: values.text,
                    })
                      .then(() => {
                        return addMessageActivity({
                          sendingAnimal,
                          receivingAnimals,
                        })
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
          include: AnimalBelongsToUser,
          where: {
            userId: req.user.id,
          },
        },
        {
          association: ConversationHasManyMessage,
        },
      ],
      limit,
      offset,
      order: [
        [ConversationHasManyMessage, 'createdAt', 'DESC'],
      ],
    })
      .then(result => {
        return getConfig('isAnonymizationEnabled').then(config => {
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
  },
  lookup: (req, res, next) => {
    return Conversation.findByPk(req.params.resourceId, {
      include: [
        {
          association: ConversationBelongsToManyAnimal,
          through: {
            attributes: [
              'updatedAt',
            ],
          },
        },
      ],
      rejectOnEmpty: true,
    })
      .then(conversation => {
        req.otherAnimals = conversation.animals.filter(animal => {
          return req.user.id !== animal.userId
        })

        req.meAnimal = conversation.animals.find(animal => {
          return req.user.id === animal.userId
        })

        req.conversation = conversation

        next()
        return null
      })
      .catch(err => next(err))
  },
  findOne: (req, res, next) => {
    return Conversation.findByPk(req.params.resourceId, {
      include: [{
        association: ConversationBelongsToManyAnimal,
        include: AnimalBelongsToUser,
      }],
      rejectOnEmpty: true,
    })
      .then(conversation => {
        return getConfig('isAnonymizationEnabled').then(config => {
          return res.json(prepareResponse(
            conversation,
            req,
            config.isAnonymizationEnabled
          ))
        })
      })
      .catch(err => next(err))
  },
}
