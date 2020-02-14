import { DateTime } from 'luxon'

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
        const isDateGiven = req.query.lastRequestAt

        const lastRequestAt = isDateGiven ? new Date(
          parseInt(req.query.lastRequestAt, 10)
        ) : new Date()

        // Check for unread messages
        const unreadMessages = messages.rows.filter(message => {
          const animalMe = message.conversation.animals[0]
          const lastCheckedAt = animalMe.conversationsAnimals.updatedAt.toISOString()

          if (message.animalId === animalMe.id) {
            return false
          }

          return DateTime.fromISO(lastCheckedAt) < DateTime.fromISO(message.createdAt.toISOString())
        })

        // Check for unread messages since the last time we looked at it
        const latestMessages = unreadMessages.filter(message => {
          return DateTime.fromISO(lastRequestAt) < DateTime.fromISO(message.createdAt.toISOString())
        })

        const hasNewMessages = (
          isDateGiven ? latestMessages.length > 0 : unreadMessages.length > 0
        )

        resolve({
          hasNewMessages,
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
