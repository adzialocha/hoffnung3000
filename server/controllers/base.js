import marked from 'marked'

import Animal from '../models/animal'
import Image from '../models/image'

import pick from '../utils/pick'

export const DEFAULT_LIMIT = 50
export const DEFAULT_OFFSET = 0

const belongsToAnimal = {
  as: 'animal',
  foreignKey: 'animalId',
  model: Animal,
}

const include = [
  belongsToAnimal,
]

export function handleImagesUpdate(resource, req) {
  // remove images when needed
  const keptImages = req.body.images.filter(img => img.id)
  const keptImageIds = keptImages.map(img => img.id)

  const removeImagesPromise = resource.getImages()
    .then(currentImages => {
      const removeImages = currentImages.filter(image => {
        return !keptImageIds.includes(image.id)
      })

      const removePromises = removeImages.map(image => {
        return Promise.all([
          image.destroy(),
          resource.removeImage(image),
        ])
      })

      return Promise.all(removePromises)
    })

  // add new images when given
  const newImages = req.body.images.filter(img => !img.id)

  const addNewImagesPromise = Promise.all(newImages.map(image => {
    return Image.create(image, { returning: true })
      .then(newImage => {
        return resource.addImage(newImage)
      })
  }))

  return Promise.all([removeImagesPromise, addNewImagesPromise])
}

export function handleImagesDelete(resource) {
  return resource.setImages([])
    .then(() => {
      return Image.destroy({
        where: {
          id: {
            $in: resource.images.map(image => image.id),
          },
        },
        individualHooks: true,
      })
    })
}

export function prepareAnimalResponse(animal) {
  const { id, name } = animal

  return {
    id,
    name,
  }
}

export function prepareAnimalResponseAll(animals) {
  return animals.map(animal => prepareAnimalResponse(animal))
}

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
