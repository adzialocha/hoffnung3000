import User from '../models/user'

const DEFAULT_LIMIT = 50
const DEFAULT_OFFSET = 0

function findOne(req, res, next) {
  User.findById(req.params.userId, {
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
      id: req.params.userId,
    },
  })
    .then(user => res.json(user))
    .catch(err => next(err))
}

function destroy(req, res, next) {
  User.destroy({
    where: {
      id: req.params.userId,
    },
  })
    .then(() => res.json({ message: 'ok' }))
    .catch(err => next(err))
}

export default {
  findOne,
  findAll,
  update,
  destroy,
}
