import {
  destroyWithSlug,
  findAllCurated,
  lookupWithSlug,
  prepareResponse,
} from './base'

import pick from '../utils/pick'
import { createDisabledSlots } from '../utils/slots'

import Place, {
  PlaceBelongsToAnimal,
  PlaceHasManySlots,
} from '../models/place'
import Slot from '../models/slot'

const include = [
  {
    association: PlaceBelongsToAnimal,
    attributes: ['name', 'id'],
  },
  PlaceHasManySlots,
]

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

function preparePlaceValues(body) {
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
    const values = preparePlaceValues(body)

    return Place.update(values, {
      where: {
        slug: req.params.resourceSlug,
      },
      limit: 1,
      returning: true,
    })
      .then(data => {
        const place = data[1][0]

        // clean up all slot before
        return Slot.destroy({
          where: {
            isDisabled: true,
            placeId: place.id,
          },
        })
          .then(() => {
            const slots = createDisabledSlots(
              body.disabledSlots,
              place.id,
              place.slotSize
            )
            return Slot.bulkCreate(slots)
          })
          .then(() => res.json(prepareResponse(place, req)))
      })
      .catch(err => next(err))
  },
}
