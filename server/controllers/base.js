import marked from 'marked'

import Animal from '../models/animal'

import pick from '../utils/pick'

export const DEFAULT_LIMIT = 50
export const DEFAULT_OFFSET = 0

const include = [{
  as: 'animal',
  foreignKey: 'animalId',
  model: Animal,
}]

export function prepareAnimalResponse(animal, isAnonymous = true) {
  if (!animal) {
    return null
  }

  const { id, name } = animal

  const data = {
    id,
    name,
  }

  if (!isAnonymous) {
    const { user } = animal

    data.userId = user.id
    data.userName = `${user.firstname} ${user.lastname}`
  }

  return data
}

export function prepareAnimalResponseAll(animals, isAnonymous) {
  return animals.map(animal => prepareAnimalResponse(animal, isAnonymous))
}

export function prepareResponse(data, req, isAnonymous) {
  const response = data.toJSON()

  // Set owner flag for frontend ui
  if (typeof req.isOwnerMe !== 'undefined') {
    response.isOwnerMe = req.isOwnerMe
  } else {
    response.isOwnerMe = (data.animal.userId === req.user.id)
  }

  // Remove userId from animal to stay anonymous
  if (response.animal) {
    response.animal = prepareAnimalResponse(response.animal, isAnonymous)
  }

  // Convert markdown to html
  response.descriptionHtml = marked(response.description)

  return response
}

export function prepareResponseAll(rows, req, isAnonymous) {
  return rows.map(row => prepareResponse(row, req, isAnonymous))
}

export function lookup(model, req, res, next) {
  return model.findByPk(req.params.resourceId, {
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
  console.log('CONSOLE LOG lookupWithSlug start')
  return model.findOne({
    include,
    rejectOnEmpty: true,
    where: {
      slug: req.params.resourceSlug,
    },
  })
    .then(data => {
      req.isFestivalFree = true
      req.resourceId = data.id
      req.ownerId = data.animal.userId
      req.isOwnerMe = (data.animal.userId === req.user.id)

      next()
      return null
    })
    .catch(err => next(err))
}

export function findOne(model, req, res, next) {
  return model.findByPk(req.params.resourceId, {
    rejectOnEmpty: true,
  })
    .then(data => res.json(data))
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

export function create(model, fields, req, res, next) {
  return model.create(pick(fields, req.body), {
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
