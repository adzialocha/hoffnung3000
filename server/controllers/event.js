import httpStatus from 'http-status'

import {
  destroyWithSlug,
  findAllCurated,
  findOneCuratedWithSlug,
  lookupWithSlug,
  updateCuratedWithSlug,
} from './base'

import Event, { EventBelongsToAnimal, EventHasManySlots } from '../models/event'
import Item from '../models/item'
import Performer from '../models/performer'
import Slot from '../models/slot'
import Place from '../models/place'

import pick from '../utils/pick'
import { createEventSlots, isInClosedOrder } from '../utils/slots'
import { APIError } from '../helpers/errors'

const permittedFields = [
  'description',
  'isPublic',
  'placeId',
  'title',
]

function areSlotsInClosedRange(req) {
  return new Promise((resolve, reject) => {
    if (isInClosedOrder(req.body.slots)) {
      resolve()
    } else {
      reject(
        new APIError(
          'Slots are not in a closed range',
          httpStatus.BAD_REQUEST
        )
      )
    }
  })
}

function areSlotsAvailable(req, fields) {
  const { placeId } = fields

  return new Promise((resolve, reject) => {
    Slot.findAndCountAll({
      where: {
        placeId,
        slotIndex: {
          $in: req.body.slots,
        },
        $or: [{
          isDisabled: true,
        }, {
          eventId: {
            $not: null,
          },
        }],
      },
    })
      .then(result => {
        if (result.count > 0) {
          reject(
            new APIError(
              'The requested slots are already taken or disabled',
              httpStatus.BAD_REQUEST
            )
          )
        } else {
          resolve()
        }
      })
  })
}

function areResourcesAvailable(req, model) {
  const slots = createEventSlots(
    req.body.slots,
    null,
    null,
    req.place.slotSize
  )

  const eventFrom = slots[0].from
  const eventTo = slots[slots.length - 1].to

  return new Promise((resolve, reject) => {
    model.findAndCountAll({
      where: {
        id: {
          $in: req.body.items,
        },
      },
      include: [{
        model: Event,
        as: 'events',
        required: true,
        include: [{
          model: Slot,
          as: 'slots',
          required: true,
          where: {
            $and: [{
              eventId: {
                $not: null,
              },
            }, {
              from: {
                $lte: eventTo,
              },
            }, {
              to: {
                $gte: eventFrom,
              },
            }],
          },
        }],
      }],
    })
      .then(result => {
        if (result.count > 0) {
          reject(
            new APIError(
              'Some of the requested items or performers are already booked',
              httpStatus.BAD_REQUEST
            )
          )
        } else {
          resolve()
        }
      })
  })
}

function createEvent(req, fields) {
  return new Promise((resolve, reject) => {
    return Place.findById(fields.placeId)
      .then(place => {
        Event.create({
          ...fields,
          animal: {
            userId: req.user.id,
          },
        }, {
          include: [
            EventBelongsToAnimal,
            EventHasManySlots,
          ],
          returning: true,
        })
          .then(event => {
            // associate items to event
            return Item.findAll({
              where: { id: { $in: req.body.items } },
            })
              .then(items => {
                event.setItems(items)

                // associate performers to event
                return Performer.findAll({
                  where: { id: { $in: req.body.performers } },
                })
                  .then(performers => {
                    event.setPerformers(performers)

                    // create slots for event
                    const slots = createEventSlots(
                      req.body.slots,
                      place.id,
                      event.id,
                      place.slotSize
                    )

                    return Slot.bulkCreate(slots)
                      .then(() => resolve(event))
                  })
              })
          })
          .catch(err => reject(err))
      })
  })
}

function validateEvent(req, fields) {
  return Place.findById(fields.placeId)
    .then(place => {
      if (!place) {
        throw new APIError(
          'The requested place does not exist',
          httpStatus.BAD_REQUEST
        )
      }

      // keep the place, because we need it later
      req.place = place

      return Promise.all([
        areSlotsInClosedRange(req),
        areSlotsAvailable(req, fields),
        areResourcesAvailable(req, Item),
        areResourcesAvailable(req, Performer),
      ])
    })
}

export default {
  create: (req, res, next) => {
    const fields = pick(permittedFields, req.body)

    // check if everything is correct before we do anything
    return validateEvent(req, fields)
      .then(() => {
        // create event
        return createEvent(req, fields)
          .then(event => res.json(event))
      })
      .catch(err => {
        next(err)
        return
      })
  },
  destroy: (req, res, next) => {
    return destroyWithSlug(Event, req, res, next)
  },
  findAll: (req, res, next) => {
    return findAllCurated(Event, req, res, next)
  },
  findOneWithSlug: (req, res, next) => {
    return findOneCuratedWithSlug(Event, req, res, next)
  },
  lookup: (req, res, next) => {
    return lookupWithSlug(Event, req, res, next)
  },
  update: (req, res, next) => {
    return updateCuratedWithSlug(Event, permittedFields, req, res, next)
  },
}
