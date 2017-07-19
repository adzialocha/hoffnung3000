import {
  createCurated,
  destroyWithSlug,
  findAllCurated,
  findOneCuratedWithSlug,
  lookupWithSlug,
  updateCuratedWithSlug,
} from './base'

import Performer from '../models/performer'

const permittedFields = [
  'description',
  'title',
]

export default {
  create: (req, res, next) => {
    return createCurated(Performer, permittedFields, req, res, next)
  },
  destroy: (req, res, next) => {
    return destroyWithSlug(Performer, req, res, next)
  },
  findAll: (req, res, next) => {
    return findAllCurated(Performer, req, res, next)
  },
  findOneWithSlug: (req, res, next) => {
    return findOneCuratedWithSlug(Performer, req, res, next)
  },
  lookup: (req, res, next) => {
    return lookupWithSlug(Performer, req, res, next)
  },
  update: (req, res, next) => {
    return updateCuratedWithSlug(Performer, permittedFields, req, res, next)
  },
}
