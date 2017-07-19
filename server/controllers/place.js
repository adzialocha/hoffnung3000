import Place from '../models/place'
import {
  createCurated,
  destroy,
  findAllCurated,
  findOneCurated,
  findOneCuratedWithSlug,
  lookup,
  update,
} from './base'

const permittedFields = [
  'description',
  'title',
]

export default {
  create: (req, res, next) => {
    return createCurated(Place, permittedFields, req, res, next)
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
    return lookup(Place, PlaceHasOneAnimal, permittedFields, req, res, next)
  },
  update: (req, res, next) => {
    return update(Place, permittedFields, req, res, next)
  },
}
