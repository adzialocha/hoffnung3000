import marked from 'marked'

import Animal from '../models/animal'
import pick from '../utils/pick'

const DEFAULT_LIMIT = 25
const DEFAULT_OFFSET = 0

const belongsToAnimal = {
  as: 'animal',
  foreignKey: 'animalId',
  model: Animal,
}

const include = [belongsToAnimal]

export function prepareResponse(data, req) {
  const response = data.toJSON()

  // set owner flag for frontend ui
  if (typeof req.isOwnerMe !== 'undefined') {
    response.isOwnerMe = req.isOwnerMe
  } else {
    response.isOwnerMe = (data.animal.userId === req.user.id)
  }

  // remove userId from animal to stay anonymous
  if (response.animal) {
    response.animal = {
      id: response.animal.id,
      name: response.animal.name,
    }
  }

  // convert markdown to html
  response.descriptionHtml = marked(response.description)

  return response
}

export function prepareResponseAll(rows, req) {
  return rows.map(row => prepareResponse(row, req))
}

export function lookup(model, req, res, next) {
  return model.findById(req.params.resourceId, {
    include,
    rejectOnEmpty: true,
  })
    .then(data => {
      req.ownerId = data.animal.userId
      next()
      return null
    })
    .catch(err => next(err))
}

export function lookupWithSlug(model, req, res, next) {
  return model.findOne({
    include,
    rejectOnEmpty: true,
    where: {
      slug: req.params.resourceSlug,
    },
  })
    .then(data => {
      req.resourceId = data.id
      req.ownerId = data.animal.userId
      req.isOwnerMe = (data.animal.userId === req.user.id)
      next()
      return null
    })
    .catch(err => next(err))
}

export function findOne(model, req, res, next) {
  return model.findById(req.params.resourceId, {
    rejectOnEmpty: true,
  })
    .then(data => res.json(data))
    .catch(err => next(err))
}

export function findOneCurated(model, req, res, next) {
  return model.findById(req.params.resourceId, {
    include,
    rejectOnEmpty: true,
  })
    .then(data => res.json(prepareResponse(data, req)))
    .catch(err => next(err))
}

export function findOneWithSlug(model, req, res, next) {
  return model.findOne({
    rejectOnEmpty: true,
    where: {
      slug: req.params.resourceSlug,
    },
  })
    .then(data => res.json(data))
    .catch(err => next(err))
}

export function findOneCuratedWithSlug(model, req, res, next) {
  return model.findOne({
    include,
    rejectOnEmpty: true,
    where: {
      slug: req.params.resourceSlug,
    },
  })
    .then(data => res.json(prepareResponse(data, req)))
    .catch(err => next(err))
}

export function findAll(model, req, res, next) {
  const {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
  } = req.query

  return model.findAndCountAll({
    limit,
    offset,
    order: [
      ['id', 'ASC'],
    ],
  })
    .then(result => {
      res.json({
        data: result.rows,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        total: result.count,
      })
    })
    .catch(err => next(err))
}

export function findAllCurated(model, req, res, next) {
  const {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
  } = req.query

  return model.findAndCountAll({
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
}

export function update(model, fields, req, res, next) {
  return model.update(pick(fields, req.body), {
    where: {
      id: req.params.resourceId,
    },
    limit: 1,
    returning: true,
  })
    .then(data => res.json(data[1][0]))
    .catch(err => next(err))
}

export function updateCuratedWithSlug(model, fields, req, res, next) {
  return model.update(pick(fields, req.body), {
    include,
    where: {
      slug: req.params.resourceSlug,
    },
    limit: 1,
    returning: true,
  })
    .then(data => res.json(prepareResponse(data[1][0], req)))
    .catch(err => next(err))
}

export function create(model, fields, req, res, next) {
  return model.create(pick(fields, req.body), {
    returning: true,
  })
    .then(data => res.json(data))
    .catch(err => next(err))
}

export function createCurated(model, fields, req, res, next) {
  return model.create({
    ...pick(fields, req.body),
    animal: {
      userId: req.user.id,
    },
  }, {
    include,
    returning: true,
  })
    .then(data => res.json(data))
    .catch(err => next(err))
}

export function destroy(model, req, res, next) {
  return model.destroy({
    where: {
      id: req.params.resourceId,
    },
  })
    .then(() => res.json({ message: 'ok' }))
    .catch(err => next(err))
}

export function destroyWithSlug(model, req, res, next) {
  return model.destroy({
    where: {
      slug: req.params.resourceSlug,
    },
  })
    .then(() => res.json({ message: 'ok' }))
    .catch(err => next(err))
}
