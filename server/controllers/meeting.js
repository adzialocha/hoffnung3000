import httpStatus from 'http-status'
import { DateTime } from 'luxon'
import { Op } from 'sequelize'

import {
  ConversationBelongsToManyAnimal,
  MeetingBelongsToConversation,
  PlaceBelongsToAnimal,
} from '../database/associations'

import Animal from '../models/animal'
import Conversation from '../models/conversation'
import Meeting from '../models/meeting'
import Message from '../models/message'
import Place from '../models/place'
import Slot from '../models/slot'

import {
  addCreateMeetingActivity,
  addJoinMeetingActivity,
} from '../services/activity'

import { APIError } from '../helpers/errors'
import { formatEventTime } from '../../common/utils/dateFormat'
import { getConfig } from '../config'
import { isInFestivalRange } from '../../common/utils/slots'
import { translate } from '../../common/services/i18n'

const ANY_DATE_FROM_NOW_MIN_HOURS = 2
const DATE_MINIMUM_TO_NOW_HOURS = 1
const DURATION_HOURS = 1

function createConversation(place, from, to, user, isAnonymous) {
  return new Promise((resolve, reject) => {
    Animal.create({
      userId: user.id,
    }, {
      returning: true,
    })
      .then(sendingAnimal => {
        const animalId = sendingAnimal.id
        const date = formatEventTime(from, to)
        const timezone = from.toFormat('ZZZZ ZZ')
        const placeTitle = place.title

        const title = translate('api.meeting.createMessageTitle', {
          date,
          timezone,
          placeTitle,
        })

        const text = translate('api.meeting.createMessageText', {
          date,
          timezone,
          name: isAnonymous ? sendingAnimal.name : user.firstname,
          placeTitle,
        })

        // Create the new conversation
        return Conversation.create({
          title,
          animalId,
        })
          .then(conversation => {
            return conversation.setAnimals([sendingAnimal])
              .then(() => {
                // Create first message in conversation
                return Message.create({
                  animalId,
                  conversationId: conversation.id,
                  text,
                })
              })
              .then(() => {
                resolve({
                  conversation,
                  animalId,
                })
              })
          })
      })
      .catch(err => {
        reject(err)
      })
  })
}

function getRandomPlace(from, to) {
  return new Promise((resolve, reject) => {
    Place.findAll({
      where: {
        isPublic: true,
      },
      include: [
        PlaceBelongsToAnimal, {
          model: Slot,
          as: 'slots',
          required: false,
          where: {
            [Op.and]: [{
              isDisabled: true,
            }, {
              from: {
                [Op.lt]: to.toISO(),
              },
            }, {
              to: {
                [Op.gt]: from.toISO(),
              },
            }],
          },
        },
      ],
    })
      .then(places => {
        const usablePlaces = places.filter(place => {
          return place.slots.length === 0
        })

        if (usablePlaces.length === 0) {
          reject(
            new APIError(
              translate('api.errors.meeting.noPlaceFound'),
              httpStatus.PRECONDITION_FAILED
            )
          )
        } else {
          resolve(usablePlaces[Math.floor(Math.random() * usablePlaces.length)])
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

function createMeeting(user, from, to, isAnonymous) {
  return getRandomPlace(from, to)
    .then(place => {
      const placeId = place.id

      return createConversation(place, from, to, user, isAnonymous)
        .then(data => {
          const { conversation, animalId } = data
          const conversationId = conversation.id

          return Meeting.create({
            conversationId,
            from: from.toISO(),
            placeId,
            to: to.toISO(),
          })
            .then(() => {
              return addCreateMeetingActivity({
                animalId,
                place,
                userId: user.id,
              })
            })
        })
    })
}

function joinMeeting(user, conversation, isAnonymous) {
  return Animal.create({
    userId: user.id,
  }, {
    returning: true,
  })
    .then(joiningAnimal => {
      const text = translate('api.meeting.joinMessageText', {
        name: isAnonymous ? joiningAnimal.name : user.firstname,
      })

      return conversation.addAnimal(joiningAnimal)
        .then(() => {
          // Create message in conversation
          return Message.create({
            animalId: joiningAnimal.id,
            conversationId: conversation.id,
            text,
          })
            .then(() => {
              return addJoinMeetingActivity({
                joiningAnimal,
                receivingAnimals: conversation.animals,
              })
            })
        })
    })
}

export default {
  requestRandomMeeting: (req, res, next) => {
    const { date, isAnyDate } = req.body

    const where = {}
    let from

    if (!isAnyDate) {
      // Meeting was requested with a date
      from = DateTime.fromISO(date).startOf('hour')

      const tresholdDate = DateTime.local()
        .startOf('hour')
        .plus({ hours: DATE_MINIMUM_TO_NOW_HOURS })

      if (from < tresholdDate) {
        next(
          new APIError(
            translate('api.errors.meeting.invalidDate'),
            httpStatus.BAD_REQUEST
          )
        )

        return null
      }

      where.from = from.toISO()
    } else {
      // Meeting was requested with any date
      from = DateTime
        .fromISO(date)
        .plus({ hours: ANY_DATE_FROM_NOW_MIN_HOURS })
        .startOf('hour')

      console.log(date, from, from.toISO())

      where.from = {
        [Op.gte]: from.toISO(),
      }
    }

    return getConfig([
      'festivalDateStart',
      'festivalDateEnd',
      'isRandomMeetingEnabled',
      'isAnonymizationEnabled',
    ])
      .then(config => {
        if (!config.isRandomMeetingEnabled) {
          next(new APIError('Random meetings are not available', httpStatus.FORBIDDEN))
          return null
        }

        const { festivalDateStart: start, festivalDateEnd: end } = config

        const isInFestival = (
          process.env.NODE_ENV === 'production' ? isInFestivalRange(from, start, end) : true
        )

        if (!isInFestival) {
          next(
            new APIError(
              translate('api.errors.meeting.festivalRange'),
              httpStatus.PRECONDITION_FAILED
            )
          )
          return null
        }

        const to = from.plus({ hours: DURATION_HOURS })

        return Meeting.findOne({
          where,
          include: [{
            association: MeetingBelongsToConversation,
            include: [{
              association: ConversationBelongsToManyAnimal,
            }],
          }],
        })
          .then(meeting => {
            if (!meeting) {
              return createMeeting(
                req.user,
                from,
                to,
                config.isAnonymizationEnabled
              )
            }

            const isAlreadyExisting = meeting.conversation.animals.find(animal => {
              return animal.userId === req.user.id
            })

            if (isAlreadyExisting) {
              throw new APIError(
                translate('api.errors.meeting.alreadyJoined'),
                httpStatus.BAD_REQUEST
              )
            }

            return joinMeeting(
              req.user,
              meeting.conversation,
              config.isAnonymizationEnabled
            )
          })
          .then(() => res.json({ status: 'ok' }))
          .catch(err => next(err))
      })
  },
}
