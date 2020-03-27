import httpStatus from 'http-status'
import { Op } from 'sequelize'

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  lookupWithSlug,
  prepareResponse,
  prepareResponseAll,
} from './base'

import { deleteEventsByIds } from '../handlers/event'
import { updateImagesForObject } from '../handlers/image'

import {
  addRequestPlaceActivity,
  addRequestResourcesActivity,
} from '../services/activity'

import pick from '../utils/pick'
import { APIError } from '../helpers/errors'
import { createEventSlots, isInClosedOrder } from '../../common/utils/slots'
import { getConfig } from '../config'

import {
  AnimalBelongsToUser,
  EventBelongsToAnimal,
  EventBelongsToManyImage,
  EventBelongsToManyResource,
  EventBelongsToPlace,
  EventHasManySlots,
  PlaceBelongsToAnimal,
  ResourceBelongsToAnimal,
} from '../database/associations'

import Event from '../models/event'
import Place from '../models/place'
import Resource from '../models/resource'
import Slot from '../models/slot'

const permittedFields = [
  'description',
  'images',
  'isPublic',
  'placeId',
  'additionalInfo',
  'ticketUrl',
  'title',
  'websiteUrl',
]

const belongsToAnimal = {
  association: EventBelongsToAnimal,
  attributes: ['name', 'id', 'userId'],
  include: AnimalBelongsToUser,
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

  let eventId = { [Op.not]: null }
  if (existingEventId) {
    eventId = { [Op.and]: [eventId, { [Op.not]: existingEventId }] }
  }

  return new Promise((resolve, reject) => {
    Slot.findAndCountAll({
      where: {
        placeId,
        slotIndex: {
          [Op.in]: req.body.slots,
        },
        [Op.or]: [{
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

function areResourcesAvailable(req, existingEventId, festivalDateStart) {
  const slots = createEventSlots(
    req.body.slots,
    null,
    null,
    req.place.slotSize,
    festivalDateStart
  )

  const eventFrom = slots[0].from
  const eventTo = slots[slots.length - 1].to

  let eventId = { [Op.not]: null }
  if (existingEventId) {
    eventId = { [Op.and]: [eventId, { [Op.not]: existingEventId }] }
  }

  return new Promise((resolve, reject) => {
    Resource.findAndCountAll({
      distinct: true,
      where: {
        id: {
          [Op.in]: req.body.resources,
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
            [Op.and]: [{
              eventId,
            }, {
              from: {
                [Op.lt]: eventTo,
              },
            }, {
              to: {
                [Op.gt]: eventFrom,
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

function createEvent(req, fields, festivalDateStart) {
  return new Promise((resolve, reject) => {
    return Place.findByPk(fields.placeId, {
      include: [
        PlaceBelongsToAnimal,
      ],
    })
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
            // Associate resources to event
            return Resource.findAll({
              where: { id: { [Op.in]: req.body.resources } },
              include: [{
                association: ResourceBelongsToAnimal,
                required: true,
              }],
            })
              .then(resources => {
                event.setResources(resources)

                // Create slots for event
                const slots = createEventSlots(
                  req.body.slots,
                  place.id,
                  event.id,
                  place.slotSize,
                  festivalDateStart
                )

                return Slot.bulkCreate(slots)
                  .then(() => {
                    return addRequestResourcesActivity({
                      event,
                      resources,
                    })
                  })
                  .then(() => {
                    return addRequestPlaceActivity({
                      event,
                      place,
                    })
                  })
                  .then(() => resolve(event))
              })
          })
          .catch(err => reject(err))
      })
  })
}

function updateEvent(req, fields, festivalDateStart) {
  return new Promise((resolve, reject) => {
    return Place.findByPk(fields.placeId, {
      include: [
        PlaceBelongsToAnimal,
      ],
    })
      .then(place => {
        Event.update({
          ...fields,
        }, {
          include: [
            EventBelongsToAnimal,
            EventBelongsToManyImage,
            EventBelongsToManyResource,
          ],
          individualHooks: true,
          limit: 1,
          returning: true,
          where: {
            slug: req.params.resourceSlug,
          },
        })
          .then(data => {
            const event = data[1][0]

            // Update images
            return updateImagesForObject(event, req.body.images)
              .then(() => {
                // Associate resources to event
                return Resource.findAll({
                  where: { id: { [Op.in]: req.body.resources } },
                  include: [{
                    association: ResourceBelongsToAnimal,
                    required: true,
                  }],
                })
                  .then(resources => {
                    event.setResources(resources)

                    // Clean up all slot before
                    return Slot.destroy({
                      where: {
                        eventId: event.id,
                      },
                    })
                      .then(() => {
                        // Create slots for event
                        const slots = createEventSlots(
                          req.body.slots,
                          place.id,
                          event.id,
                          place.slotSize,
                          festivalDateStart
                        )

                        // Filter out only new resources for notifications
                        const currentResourceIds = resources.map(resource => {
                          return resource.id
                        })

                        const newResources = currentResourceIds.sort().filter(
                          id => {
                            return !req.body.resources.sort().includes(id)
                          }
                        )

                        return Slot.bulkCreate(slots)
                          .then(() => {
                            if (newResources.length === 0) {
                              return Promise.resolve()
                            }

                            return addRequestResourcesActivity({
                              event,
                              newResources,
                            })
                          })
                          .then(() => {
                            return addRequestPlaceActivity({
                              event,
                              place,
                            })
                          })
                          .then(() => {
                            // Return the whole event with all associations
                            return Event.findByPk(event.id, { include })
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

function validateEvent(req, fields, eventId, festivalDateStart) {
  return Place.findByPk(fields.placeId)
    .then(place => {
      if (!place) {
        throw new APIError(
          'The requested place does not exist',
          httpStatus.BAD_REQUEST
        )
      }

      // Keep the place, because we need it later
      req.place = place

      return Promise.all([
        areSlotsInClosedRange(req),
        areSlotsAvailable(req, fields, eventId),
        areResourcesAvailable(req, eventId, festivalDateStart),
      ])
    })
}

function findOneWithSlug(slug, req, res, next) {
  return Event.findOne({
    include,
    rejectOnEmpty: true,
    where: {
      slug,
    },
    order: [
      [EventHasManySlots, 'from', 'ASC'],
    ],
  })
    .then(data => {
      if (!data.isPublic && req.user.isVisitor) {
        next(
          new APIError(
            'Requested resource is not public',
            httpStatus.FORBIDDEN
          )
        )
        return null
      }

      return getConfig('isAnonymizationEnabled').then(config => {
        return res.json(prepareResponse(
          data,
          req,
          config.isAnonymizationEnabled
        ))
      })
    })
    .catch(err => next(err))
}

export default {
  create: (req, res, next) => {
    const fields = pick(permittedFields, req.body)

    // Check if everything is correct before we do anything
    return getConfig('festivalDateStart')
      .then(config => {
        return validateEvent(req, fields, null, config.festivalDateStart)
          .then(() => {
            // Create event
            return createEvent(req, fields, config.festivalDateStart)
              .then(event => {
                return findOneWithSlug(event.slug, req, res, next)
              })
          })
          .catch(err => {
            next(err)
            return
          })
      })
  },
  destroy: (req, res, next) => {
    return deleteEventsByIds([req.resourceId])
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

    const includeForVisitors = [
      belongsToAnimal,
      belongsToManyResources,
      {
        association: EventBelongsToPlace,
        required: true,
        where: {
          isPublic: true,
        },
      },
      EventBelongsToManyImage,
      hasManySlots,
    ]

    if (req.query.fetchAll) {
      return Event.findAndCountAll({
        distinct: true,
        include: req.user.isVisitor ? includeForVisitors : include,
        order: [
          [EventHasManySlots, 'from', 'ASC'],
        ],
        where: req.user.isVisitor ? { isPublic: true } : {},
      })
        .then(result => {
          return getConfig('isAnonymizationEnabled').then(config => {
            res.json({
              data: prepareResponseAll(
                result.rows,
                req,
                config.isAnonymizationEnabled
              ),
              total: result.count,
            })
          })
        })
        .catch(err => next(err))
    }

    return Event.findAndCountAll({
      distinct: true,
      include: req.user.isVisitor ? includeForVisitors : include,
      limit,
      offset,
      order: [
        [EventHasManySlots, 'from', 'ASC'],
      ],
      where: req.user.isVisitor ? { isPublic: true } : {},
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
  findOneWithSlug: (req, res, next) => {
    return findOneWithSlug(req.params.resourceSlug, req, res, next)
  },
  lookup: (req, res, next) => {
    return lookupWithSlug(Event, req, res, next)
  },
  update: (req, res, next) => {
    const fields = pick(permittedFields, req.body)

    // Check if everything is correct before we do anything
    return getConfig(['festivalDateStart', 'isAnonymizationEnabled'])
      .then(config => {
        return validateEvent(req, fields, req.resourceId, config.festivalDateStart)
          .then(() => {
            // Update event
            return updateEvent(req, fields, config.festivalDateStart)
              .then(event => {
                res.json(prepareResponse(
                  event,
                  req,
                  config.isAnonymizationEnabled
                ))
              })
          })
          .catch(err => {
            next(err)
            return
          })
      })
  },
}
