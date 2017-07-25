import httpStatus from 'http-status'

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  handleImagesDelete,
  handleImagesUpdate,
  lookupWithSlug,
  prepareResponse,
  prepareResponseAll,
} from './base'

import Event, {
  EventBelongsToAnimal,
  EventBelongsToManyImage,
  EventBelongsToPlace,
  EventHasManySlots,
} from '../models/event'
import Resource, {
  EventBelongsToManyResource,
  ResourceBelongsToAnimal,
} from '../models/resource'
import Slot from '../models/slot'
import Place, {
  PlaceBelongsToAnimal,
} from '../models/place'

import pick from '../utils/pick'
import { createEventSlots, isInClosedOrder } from '../utils/slots'
import { APIError } from '../helpers/errors'

const permittedFields = [
  'description',
  'images',
  'isPublic',
  'placeId',
  'title',
]

const belongsToAnimal = {
  association: EventBelongsToAnimal,
  attributes: ['name', 'id', 'userId'],
}

const belongsToManyResources = {
  association: EventBelongsToManyResource,
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  include: [{
    association: ResourceBelongsToAnimal,
    attributes: ['name', 'id'],
  }],
}

const belongsToPlace = {
  association: EventBelongsToPlace,
  include: [{
    association: PlaceBelongsToAnimal,
    attributes: ['name', 'id'],
  }],
}

const hasManySlots = {
  association: EventHasManySlots,
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const include = [
  belongsToAnimal,
  belongsToManyResources,
  belongsToPlace,
  EventBelongsToManyImage,
  hasManySlots,
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

function areSlotsAvailable(req, fields, existingEventId) {
  const { placeId } = fields

  let eventId = { $not: null }
  if (existingEventId) {
    eventId = { $and: [eventId, { $not: existingEventId }] }
  }

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
          eventId,
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

function areResourcesAvailable(req, existingEventId) {
  const slots = createEventSlots(
    req.body.slots,
    null,
    null,
    req.place.slotSize
  )

  const eventFrom = slots[0].from
  const eventTo = slots[slots.length - 1].to

  let eventId = { $not: null }
  if (existingEventId) {
    eventId = { $and: [eventId, { $not: existingEventId }] }
  }

  return new Promise((resolve, reject) => {
    Resource.findAndCountAll({
      distinct: true,
      where: {
        id: {
          $in: req.body.resources,
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
              eventId,
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
              'Some of the requested resources are already booked',
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
            EventBelongsToManyImage,
          ],
          returning: true,
        })
          .then(event => {
            // associate resources to event
            return Resource.findAll({
              where: { id: { $in: req.body.resources } },
            })
              .then(resources => {
                event.setResources(resources)

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
          .catch(err => reject(err))
      })
  })
}

function updateEvent(req, fields) {
  return new Promise((resolve, reject) => {
    return Place.findById(fields.placeId)
      .then(place => {
        Event.update({
          ...fields,
        }, {
          include: [
            EventBelongsToManyImage,
          ],
          where: {
            slug: req.params.resourceSlug,
          },
          limit: 1,
          returning: true,
        })
          .then(data => {
            const event = data[1][0]

            // update images
            return handleImagesUpdate(event, req)
              .then(() => {
                // associate resources to event
                return Resource.findAll({
                  where: { id: { $in: req.body.resources } },
                })
                  .then(resources => {
                    event.setResources(resources)

                    // clean up all slot before
                    return Slot.destroy({
                      where: {
                        eventId: event.id,
                      },
                    })
                      .then(() => {
                        // create slots for event
                        const slots = createEventSlots(
                          req.body.slots,
                          place.id,
                          event.id,
                          place.slotSize
                        )

                        return Slot.bulkCreate(slots)
                          .then(() => {
                            // return the whole event with all associations
                            return Event.findById(event.id, { include })
                              .then(updatedEvent => resolve(updatedEvent))
                          })
                      })
                  })
              })
          })
          .catch(err => reject(err))
      })
  })
}

function validateEvent(req, fields, eventId) {
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
        areSlotsAvailable(req, fields, eventId),
        areResourcesAvailable(req, eventId),
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
          .then(event => res.json(prepareResponse(event, req)))
      })
      .catch(err => {
        next(err)
        return
      })
  },
  destroy: (req, res, next) => {
    return Event.findById(req.resourceId, {
      include: [
        EventBelongsToManyImage,
      ],
      rejectOnEmpty: true,
    })
      .then((event) => {
        return handleImagesDelete(event)
          .then(() => {
            return event.destroy()
          })
      })
      .then(() => {
        // delete related slots
        return Slot.destroy({
          where: {
            eventId: req.resourceId,
          },
        })
      })
      .then(() => {
        res.json({ message: 'ok' })
      })
      .catch(err => next(err))
  },
  findAll: (req, res, next) => {
    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = req.query

    return Event.findAndCountAll({
      distinct: true,
      include,
      limit,
      offset,
      order: [
        [EventHasManySlots, 'from', 'ASC'],
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
  findOneWithSlug: (req, res, next) => {
    return Event.findOne({
      include,
      rejectOnEmpty: true,
      where: {
        slug: req.params.resourceSlug,
      },
    })
      .then(data => res.json(prepareResponse(data, req)))
      .catch(err => next(err))
  },
  lookup: (req, res, next) => {
    return lookupWithSlug(Event, req, res, next)
  },
  update: (req, res, next) => {
    const fields = pick(permittedFields, req.body)

    // check if everything is correct before we do anything
    return validateEvent(req, fields, req.resourceId)
      .then(() => {
        // update event
        return updateEvent(req, fields)
          .then(event => res.json(prepareResponse(event, req)))
      })
      .catch(err => {
        next(err)
        return
      })
  },
}
