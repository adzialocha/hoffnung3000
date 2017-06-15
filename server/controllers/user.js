import User from '../models/user'

const DEFAULT_LIMIT = 25
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

  User.findAndCountAll({
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
  const {
    email,
    firstname,
    isAdmin,
    isParticipant,
    lastname,
  } = req.body

  User.update({
    email,
    firstname,
    isAdmin,
    isParticipant,
    lastname,
  }, {
    where: {
      id: req.params.resourceId,
    },
    limit: 1,
    returning: true,
  })
    .then(result => res.json(result[1][0]))
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
