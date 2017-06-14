import Page from '../models/page'

const DEFAULT_LIMIT = 25
const DEFAULT_OFFSET = 0

function lookup(req, res, next) {
  Page.findOne({
    where: {
      slug: req.params.resourceSlug,
    },
    rejectOnEmpty: true,
  })
    .then(() => {
      next()
      return null
    })
    .catch(err => next(err))
}

function findOne(req, res, next) {
  Page.findOne({
    where: {
      slug: req.params.resourceSlug,
    },
    rejectOnEmpty: true,
  })
    .then(page => res.json(page))
    .catch(err => next(err))
}

function findAll(req, res, next) {
  const {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
  } = req.query

  Page.findAndCountAll({
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

function update(req, res, next) {
  const { title, slug, content } = req.body

  Page.update({
    title,
    slug,
    content,
  }, {
    where: {
      slug: req.params.resourceSlug,
    },
  })
    .then(page => res.json(page))
    .catch(err => next(err))
}

function create(req, res, next) {
  const { title, slug, content } = req.body

  Page.create({
    title,
    slug,
    content,
  })
    .then((user) => { res.json({ message: 'ok', user }) })
    .catch(err => next(err))
}

function destroy(req, res, next) {
  Page.destroy({
    where: {
      slug: req.params.resourceSlug,
    },
  })
    .then(() => res.json({ message: 'ok' }))
    .catch(err => next(err))
}

export default {
  lookup,
  findOne,
  findAll,
  create,
  update,
  destroy,
}
