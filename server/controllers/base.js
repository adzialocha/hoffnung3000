const DEFAULT_LIMIT = 25
const DEFAULT_OFFSET = 0

function pickFields(fields, body) {
  return fields.reduce((result, fieldName) => {
    if (typeof body[fieldName] !== 'undefined') {
      result[fieldName] = body[fieldName]
    }
    return result
  }, {})
}

export function lookup(model, req, res, next) {
  model.findById(req.params.resourceId, {
    rejectOnEmpty: true,
  })
    .then(data => {
      if ('ownerId' in data) {
        req.ownerId = data.ownerId
      }
      next()
      return null
    })
    .catch(err => next(err))
}

export function findOne(model, req, res, next) {
  model.findById(req.params.resourceId, {
    rejectOnEmpty: true,
  })
    .then(data => res.json(data))
    .catch(err => next(err))
}

export function findOneWithSlug(model, req, res, next) {
  model.findOne({
    where: {
      slug: req.params.resourceSlug,
    },
    rejectOnEmpty: true,
  })
    .then(data => res.json(data))
    .catch(err => next(err))
}

export function findAll(model, req, res, next) {
  const {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
  } = req.query

  model.findAndCountAll({
    limit,
    offset,
  })
    .then(result => {
      res.json({
        data: result.rows,
        limit,
        offset,
        total: result.count,
      })
    })
    .catch(err => next(err))
}

export function update(model, fields, req, res, next) {
  const fieldss = pickFields(fields, req.body)
  model.update(fieldss, {
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
  model.create(pickFields(fields, req.body), {
    returning: true,
  })
    .then((data) => { res.json(data) })
    .catch(err => next(err))
}

export function destroy(model, req, res, next) {
  model.destroy({
    where: {
      id: req.params.resourceId,
    },
  })
    .then(() => res.json({ message: 'ok' }))
    .catch(err => next(err))
}
