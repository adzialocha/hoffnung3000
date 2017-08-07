import dateFns from 'date-fns'

import {
  MessageBelongsToConversation,
  ConversationBelongsToManyAnimal,
} from '../database/associations'

import { getMyActivities } from '../handlers/activity'

import Message from '../models/message'

const LATEST_ACTIVITIES_COUNT = 3

function getUnreadMessageCount(req) {
  return new Promise((resolve, reject) => {
    Message.findAndCountAll({
      include: [{
        association: MessageBelongsToConversation,
        required: true,
        include: [{
          association: ConversationBelongsToManyAnimal,
          as: 'animals',
          required: true,
          where: {
            userId: req.user.id,
          },
          through: {
            attributes: [
              'updatedAt',
            ],
          },
        }],
      }],
    })
      .then(messages => {
        const unreadMessages = messages.rows.filter(message => {
          const animalMe = message.conversation.animals[0]
          const lastCheckedAt = animalMe.conversationsAnimals.updatedAt

          if (message.animalId === animalMe.id) {
            return false
          }

          return dateFns.isBefore(
            lastCheckedAt,
            message.createdAt
          )
        })

        resolve({
          unreadMessagesCount: unreadMessages.length,
        })
      })
      .catch(err => reject(err))
  })
}

function getLatestActivities(req) {
  return new Promise((resolve, reject) => {
    getMyActivities(LATEST_ACTIVITIES_COUNT, 0, req.user.id)
      .then(result => {
        resolve({
          latestActivities: result.data,
        })
      })
      .catch(err => reject(err))
  })
}

export default {
  status: (req, res, next) => {
    const promises = [
      getUnreadMessageCount(req),
      getLatestActivities(req),
    ]

    return Promise.all(promises)
      .then(results => {
        const response = results.reduce((acc, result) => {
          return Object.assign({}, acc, result)
        }, {})

        res.json(response)
      })
      .catch(err => next(err))
  },
}
