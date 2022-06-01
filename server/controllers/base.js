import Animal from '../models/animal'
import pick from '../../common/utils/pick'
import { renderMarkdown } from '../services/marked'

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

  if (!isAnonymous && animal.user) {
    const { user } = animal

    data.userId = user.id
    data.userName = user.username
  }

  return data
}

export function prepareAnimalResponseAll(animals, isAnonymous) {
  return animals.map(animal => prepareAnimalResponse(animal, isAnonymous))
}

function filterAnimal(obj, isAnonymous) {
  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (key === 'animal') {
        obj.animal = prepareAnimalResponse(obj.animal, isAnonymous)
      } else {
        obj[key] = filterAnimal(obj[key], isAnonymous)
      }
    })
  }

  return obj
}

export function prepareResponse(data, req, isAnonymous) {
  let response = 'toJSON' in data ? data.toJSON() : data

  // Set owner flag for frontend ui
  if (typeof req.isOwnerMe !== 'undefined') {
    response.isOwnerMe = req.isOwnerMe
  } else {
    response.isOwnerMe = (data.animal.userId === req.user.id)
  }

  // Remove userId from animal to stay anonymous
  response = filterAnimal(response, isAnonymous)

  // Convert markdown to html
  response.descriptionHtml = renderMarkdown(response.description)
  if (response.additionalInfo) {
    response.additionalInfoHtml = renderMarkdown(response.additionalInfo)
  }

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
