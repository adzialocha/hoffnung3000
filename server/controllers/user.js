import User from '../models/user'

const DEFAULT_LIMIT = 50
const DEFAULT_OFFSET = 0

function findOne(req, res, next) {
  User.findById(req.params.userId, {
    rejectOnEmpty: true,
  })
    .then(user => res.json(user))
    .catch(e => next(e))
}

function findAll(req, res, next) {
  const {
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
  } = req.query

  User.findAll({ limit, offset })
    .then(users => res.json(users))
    .catch(e => next(e))
}

function create(req, res, next) {
  const { firstname, lastname, email } = req.body

  User.create({
    firstname,
    lastname,
    email,
  })
    .then(user => res.json(user))
    .catch(e => next(e))
}

function update(req, res, next) {
  const { firstname, lastname, email } = req.body

  User.update({
    firstname,
    lastname,
    email,
  }, {
    where: {
      id: req.params.userId,
    },
  })
    .then(user => res.json(user))
    .catch(e => next(e))
}

function destroy(req, res, next) {
  User.destroy({
    where: {
      id: req.params.userId,
    },
  })
    .then(user => res.json(user))
    .catch(e => next(e))
}

export default {
  findOne,
  findAll,
  create,
  update,
  destroy,
}
