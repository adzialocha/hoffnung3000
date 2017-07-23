import {
  createCurated,
  destroyWithSlug,
  findAllCurated,
  findOneCuratedWithSlug,
  lookupWithSlug,
  updateCuratedWithSlug,
} from './base'

import Item from '../models/item'
import Event from '../models/event'
import Slot from '../models/slot'

import { createEventSlots, isInClosedOrder } from '../utils/slots'
import { APIError } from '../helpers/errors'

const permittedFields = [
  'description',
  'title',
]

export default {
  create: (req, res, next) => {
    return createCurated(Item, permittedFields, req, res, next)
  },
  destroy: (req, res, next) => {
    return destroyWithSlug(Item, req, res, next)
  },
  findAll: (req, res, next) => {
    return findAllCurated(Item, req, res, next)
  },
  findOneWithSlug: (req, res, next) => {
    return findOneCuratedWithSlug(Item, req, res, next)
  },
  lookup: (req, res, next) => {
    return lookupWithSlug(Item, req, res, next)
  },
  update: (req, res, next) => {
    return updateCuratedWithSlug(Item, permittedFields, req, res, next)
  },
}
