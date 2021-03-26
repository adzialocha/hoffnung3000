import httpStatus from 'http-status'
import { Op } from 'sequelize'

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  lookupWithSlug,
  prepareResponse,
  prepareResponseAll,
} from './base'

import { deletePlacesByIds } from '../handlers/place'
import { updateImagesForObject } from '../handlers/image'

import {
  AnimalBelongsToUser,
  PlaceBelongsToAnimal,
  PlaceBelongsToManyImage,
  PlaceHasManySlots,
} from '../database/associations'

import pick from '../../common/utils/pick'
import { APIError } from '../helpers/errors'
import { createDisabledSlots } from '../../common/utils/slots'
import { getConfig } from '../config'

import Place from '../models/place'
import Slot from '../models/slot'

const include = [
  {
    association: PlaceBelongsToAnimal,
    attributes: ['name', 'id', 'userId'],
    include: AnimalBelongsToUser,
  },
  PlaceHasManySlots,
  PlaceBelongsToManyImage,
]

const permittedFields = [
  'accessibilityInfo',
  'capacity',
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
          [Op.in]: slotIndexes,
        },
        eventId: {
          [Op.not]: null,
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
    accessibilityInfo,
    capacity,
    description,
    isPublic,
    mode,
    title,
    street,
    cityCode,
    city,
    country,
    latitude,
    longitude,
  } = body

  const values = {
    accessibilityInfo,
    capacity,
    description,
    images: body.images || [],
    isPublic,
    mode,
    title,
    street,
    cityCode,
    city,
    country,
    latitude,
    longitude,
  }

  if (body.slotSize) {
    values.slotSize = body.slotSize
  }

  return {
    ...values,
  }
}

function findOneWithSlug(slug, req, res, next) {
  return Place.findOne({
    include,
    rejectOnEmpty: true,
    where: {
      slug,
    },
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
        const response = prepareResponse(
          data,
          req,
          config.isAnonymizationEnabled
        )

        if (!response.isOwnerMe) {
          delete response.slots
        }

        res.json(response)
      })
    })
    .catch(err => next(err))
}

export default {
  create: (req, res, next) => {
    const body = pick(permittedFieldsCreate, req.body)
    const values = preparePlaceValues(body)

    return getConfig('festivalDateStart').then(config => {
      values.slots = createDisabledSlots(
        body.disabledSlots,
        null,
        body.slotSize,
        config.festivalDateStart
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
        .then(data => {
          return findOneWithSlug(data.slug, req, res, next)
        })
        .catch(err => next(err))
    })
  },
  destroyWithSlug: (req, res, next) => {
    return deletePlacesByIds([req.resourceId])
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
  lookupWithSlug: (req, res, next) => {
    return lookupWithSlug(Place, req, res, next)
  },
  updateWithSlug: (req, res, next) => {
    const body = pick(permittedFields, req.body)
    const values = preparePlaceValues(body)

    // Check first if we can disable the requested slots
    areSlotsBooked(req.resourceId, body.disabledSlots)
      .then(() => {
        // Update place
        Place.update(values, {
          include,
          individualHooks: true,
          limit: 1,
          returning: true,
          where: {
            slug: req.params.resourceSlug,
          },
        })
          .then(data => {
            return getConfig([
              'festivalDateStart',
              'isAnonymizationEnabled',
            ]).then(config => {
              const previousPlace = data[1][0]

              return updateImagesForObject(previousPlace, req.body.images)
                .then(() => {
                  // Clean up all slot before
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
                    previousPlace.slotSize,
                    config.festivalDateStart
                  )
                  return Slot.bulkCreate(slots)
                })
                .then(() => {
                  return Place.findByPk(previousPlace.id, { include })
                    .then(place => {
                      res.json(prepareResponse(
                        place,
                        req,
                        config.isAnonymizationEnabled
                      ))
                    })
                })
            })
          })
      })
      .catch(err => next(err))
  },
}
