import {
  destroyWithSlug,
  findAllCurated,
  lookupWithSlug,
  prepareResponse,
} from './base'

import pick from '../utils/pick'

import Animal from '../models/animal'
import Place from '../models/place'
import Slot from '../models/slot'

const include = [{
  as: 'animal',
  foreignKey: 'animalId',
  model: Animal,
}, {
  as: 'slots',
  targetKey: 'placeId',
  model: Slot,
}]

const permittedFields = [
  'city',
  'cityCode',
  'country',
  'description',
  'disabledSlots',
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

function preparePlaceValues(body, placeId) {
  const {
    description,
    isPublic,
    mode,
    title,
  } = body

  const values = {
    description,
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

  const slots = body.disabledSlots.map((slotIndex) => {
    const slot = {
      slotIndex,
      isDisabled: true,
    }

    if (placeId) {
      slot.placeId = placeId
    }

    return slot
  })

  if (body.slotSize) {
    values.slotSize = body.slotSize
  }

  return {
    ...values,
    slots,
  }
}

export default {
  create: (req, res, next) => {
    const body = pick(permittedFieldsCreate, req.body)
    const values = preparePlaceValues(body)

    return Place.create({
      ...values,
      animal: {
        userId: req.user.id,
      },
    }, {
      include,
      returning: true,
    })
      .then(data => res.json(data))
      .catch(err => next(err))
  },
  destroyWithSlug: (req, res, next) => {
    return destroyWithSlug(Place, req, res, next)
  },
  findAll: (req, res, next) => {
    return findAllCurated(Place, req, res, next)
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
    const values = preparePlaceValues(body, req.resourceId)

    return Place.update(values, {
      where: {
        slug: req.params.resourceSlug,
      },
      limit: 1,
      returning: true,
    })
      .then(data => {
        // clean up all slot before
        return Slot.destroy({
          where: {
            isDisabled: true,
            placeId: req.resourceId,
          },
        })
          .then(() => {
            return Slot.bulkCreate(values.slots)
          })
          .then(() => res.json(prepareResponse(data[1][0], req)))
      })
      .catch(err => next(err))
  },
}
