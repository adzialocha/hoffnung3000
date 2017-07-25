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

import pick from '../utils/pick'
import { createDisabledSlots } from '../utils/slots'

import Event from '../models/event'
import Place, {
  PlaceBelongsToAnimal,
  PlaceBelongsToManyImage,
  PlaceHasManySlots,
} from '../models/place'
import Slot from '../models/slot'

import { APIError } from '../helpers/errors'

const include = [
  {
    association: PlaceBelongsToAnimal,
    attributes: ['name', 'id', 'userId'],
  },
  PlaceHasManySlots,
  PlaceBelongsToManyImage,
]

const permittedFields = [
  'city',
  'cityCode',
  'country',
  'description',
  'disabledSlots',
  'images',
  'isPublic',
  'latitude',
  'longitude',
  'mode',
  'street',
  'title',
]

const permittedFieldsCreate = permittedFields.concat([
  'slotSize',
])

function areSlotsBooked(placeId, slotIndexes) {
  return new Promise((resolve, reject) => {
    Slot.findAndCountAll({
      where: {
        placeId,
        slotIndex: {
          $in: slotIndexes,
        },
        eventId: {
          $not: null,
        },
      },
    })
      .then(result => {
        if (result.count > 0) {
          reject(
            new APIError(
              'Can\'t disable slots which are already booked by someone',
              httpStatus.BAD_REQUEST
            )
          )
        } else {
          resolve()
        }
      })
  })
}

function preparePlaceValues(body) {
  const {
    description,
    isPublic,
    mode,
    title,
  } = body

  const values = {
    description,
    images: body.images || [],
    isPublic,
    mode,
    title,
  }

  if (mode === 'address') {
    values.street = body.street
    values.cityCode = body.cityCode
    values.city = body.city
    values.country = body.country
  } else if (mode === 'gps') {
    values.latitude = body.latitude
    values.longitude = body.longitude
  }

  if (body.slotSize) {
    values.slotSize = body.slotSize
  }

  return {
    ...values,
  }
}

export default {
  create: (req, res, next) => {
    const body = pick(permittedFieldsCreate, req.body)
    const values = preparePlaceValues(body)

    values.slots = createDisabledSlots(
      body.disabledSlots,
      null,
      body.slotSize
    )

    return Place.create({
      ...values,
      animal: {
        userId: req.user.id,
      },
    }, {
      include,
      returning: true,
    })
      .then(data => res.json(prepareResponse(data, req)))
      .catch(err => next(err))
  },
  destroyWithSlug: (req, res, next) => {
    return Place.findById(req.resourceId, {
      include,
      rejectOnEmpty: true,
    })
      .then((place) => {
        // delete all related images
        return handleImagesDelete(place)
          .then(() => {
            // delete the place
            return place.destroy()
          })
      })
      .then(() => {
        // delete related events
        return Event.destroy({
          where: {
            placeId: req.resourceId,
          },
        })
      })
      .then(() => {
        // delete related slots
        return Slot.destroy({
          where: {
            placeId: req.resourceId,
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

    return Place.findAndCountAll({
      distinct: true,
      include,
      limit,
      offset,
      order: [
        ['createdAt', 'DESC'],
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
    return Place.findOne({
      include,
      rejectOnEmpty: true,
      where: {
        slug: req.params.resourceSlug,
      },
    })
      .then(data => {
        const response = prepareResponse(data, req)
        if (!response.isOwnerMe) {
          delete response.slots
        }
        res.json(response)
      })
      .catch(err => next(err))
  },
  lookupWithSlug: (req, res, next) => {
    return lookupWithSlug(Place, req, res, next)
  },
  updateWithSlug: (req, res, next) => {
    const body = pick(permittedFields, req.body)
    const values = preparePlaceValues(body)

    // check first if we can disable the requested slots
    areSlotsBooked(req.resourceId, body.disabledSlots)
      .then(() => {
        // update place
        Place.update(values, {
          include,
          where: {
            slug: req.params.resourceSlug,
          },
          limit: 1,
          returning: true,
        })
          .then(data => {
            const previousPlace = data[1][0]

            return handleImagesUpdate(previousPlace, req)
              .then(() => {
                // clean up all slot before
                return Slot.destroy({
                  where: {
                    isDisabled: true,
                    placeId: previousPlace.id,
                  },
                })
              })
              .then(() => {
                const slots = createDisabledSlots(
                  body.disabledSlots,
                  previousPlace.id,
                  previousPlace.slotSize
                )
                return Slot.bulkCreate(slots)
              })
              .then(() => {
                return Place.findById(previousPlace.id, { include })
                  .then(place => {
                    res.json(prepareResponse(place, req))
                  })
              })
          })
      })
      .catch(err => next(err))
  },
}
