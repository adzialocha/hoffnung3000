import User from '../models/user'

const DEFAULT_LIMIT = 50
const DEFAULT_OFFSET = 0

function lookup(req, res, next) {
  User.findById(req.params.resourceId, {
    rejectOnEmpty: true,
  })
    .then(user => {
      req.ownerId = user.id
      next()
      return null
    })
    .catch(err => next(err))
}

function findOne(req, res, next) {
  User.findById(req.params.resourceId, {
    rejectOnEmpty: true,
  })
    .then(user => res.json(user))
    .catch(err => next(err))
}

function findAll(req, res, next) {
  const {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
  } = req.query

  User.findAll({
    limit,
    offset,
  })
    .then(users => res.json(users))
    .catch(err => next(err))
}

function update(req, res, next) {
  const { firstname, lastname, email } = req.body

  User.update({
    firstname,
    lastname,
    email,
  }, {
    where: {
      id: req.params.resourceId,
    },
  })
    .then(user => res.json(user))
    .catch(err => next(err))
}

function destroy(req, res, next) {
  User.destroy({
    where: {
      id: req.params.resourceId,
    },
  })
    .then(() => res.json({ message: 'ok' }))
    .catch(err => next(err))
}

export default {
  lookup,
  findOne,
  findAll,
  update,
  destroy,
}
