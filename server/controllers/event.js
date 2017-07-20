import {
  createCurated,
  destroyWithSlug,
  findAllCurated,
  findOneCuratedWithSlug,
  lookupWithSlug,
  updateCuratedWithSlug,
} from './base'

import Event from '../models/event'

const permittedFields = [
  'description',
  'title',
]

export default {
  create: (req, res, next) => {
    return createCurated(Event, permittedFields, req, res, next)
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
