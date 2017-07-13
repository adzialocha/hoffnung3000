import pick from '../utils/pick'
import Place from '../models/place'
import { destroy, update } from './base'
import { PlaceHasOneAnimal } from '../models/animal'

const DEFAULT_LIMIT = 25
const DEFAULT_OFFSET = 0

const permittedFields = [
  'description',
  'title',
]

export default {
  create: (req, res, next) => {
    return Place.create({
      ...pick(permittedFields, req.body),
      animal: {
        userId: req.user.id,
      },
    }, {
      returning: true,
      include: [{
        association: PlaceHasOneAnimal,
      }],
    })
      .then((data) => { res.json(data) })
      .catch(err => next(err))
  },
  destroy: (req, res, next) => {
    return destroy(Place, req, res, next)
  },
  findAll: (req, res, next) => {
    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = req.query

    Place.findAndCountAll({
      limit,
      offset,
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [{
        association: PlaceHasOneAnimal,
        attributes: ['id', 'name'],
      }],
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
  },
  findOne: (req, res, next) => {
    Place.findById(req.params.resourceId, {
      rejectOnEmpty: true,
      include: [{
        association: PlaceHasOneAnimal,
        attributes: ['id', 'name'],
      }],
    })
      .then(data => res.json(data))
      .catch(err => next(err))
  },
  lookup: (req, res, next) => {
    Place.findById(req.params.resourceId, {
      rejectOnEmpty: true,
      include: [{
        association: PlaceHasOneAnimal,
      }],
    })
      .then(data => {
        req.ownerId = data.animal.userId
        next()
        return null
      })
      .catch(err => next(err))
  },
  update: (req, res, next) => {
    return update(Place, permittedFields, req, res, next)
  },
}
