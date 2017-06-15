import {
  create,
  destroy,
  findAll,
  findOne,
  findOneWithSlug,
  update,
} from './base'

import Page from '../models/page'

const permittedFields = [
  'content',
  'slug',
  'title',
]

export default {
  create: (req, res, next) => {
    return create(Page, permittedFields, req, res, next)
  },
  destroy: (req, res, next) => {
    return destroy(Page, req, res, next)
  },
  findAll: (req, res, next) => {
    return findAll(Page, req, res, next)
  },
  findOne: (req, res, next) => {
    return findOne(Page, req, res, next)
  },
  findOneWithSlug: (req, res, next) => {
    return findOneWithSlug(Page, req, res, next)
  },
  update: (req, res, next) => {
    return update(Page, permittedFields, req, res, next)
  },
}
