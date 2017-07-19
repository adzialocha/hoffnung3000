import {
  destroy,
  findAllCurated,
  findOneCurated,
  findOneCuratedWithSlug,
  lookupWithSlug,
  update,
} from './base'

import pick from '../utils/pick'

import Animal from '../models/animal'
import Place from '../models/place'
import Slot from '../models/slot'

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
  'slotSize',
  'street',
  'title',
]

export default {
  create: (req, res, next) => {
    const body = pick(permittedFields, req.body)
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
      return {
        slotIndex,
        isDisabled: true,
      }
    })

    const splittedSlotSize = body.slotSize.split(':')
    values.slotSize = (
      (parseInt(splittedSlotSize[0], 10) * 60) +
      parseInt(splittedSlotSize[1], 10)
    )

    return Place.create({
      ...values,
      animal: {
        userId: req.user.id,
      },
      slots,
    }, {
      include: [{
        as: 'animal',
        foreignKey: 'animalId',
        model: Animal,
      }, {
        as: 'slots',
        targetKey: 'placeId',
        model: Slot,
      }],
      returning: true,
    })
      .then(data => res.json(data))
      .catch(err => next(err))
  },
  destroy: (req, res, next) => {
    return destroy(Place, req, res, next)
  },
  findAll: (req, res, next) => {
    return findAllCurated(Place, req, res, next)
  },
  findOne: (req, res, next) => {
    return findOneCurated(Place, req, res, next)
  },
  findOneWithSlug: (req, res, next) => {
    return findOneCuratedWithSlug(Place, req, res, next)
  },
  lookup: (req, res, next) => {
    return lookupWithSlug(Place, req, res, next)
  },
  update: (req, res, next) => {
    return update(Place, permittedFields, req, res, next)
  },
}
