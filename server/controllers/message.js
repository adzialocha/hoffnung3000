import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  prepareAnimalResponse,
} from './base'

import Message, { MessageBelongsToAnimal } from '../models/message'

import pick from '../utils/pick'

const permittedFields = [
  'text',
]

function prepareResponse(message) {
  const response = message.toJSON()

  if (response.animal) {
    response.animal = prepareAnimalResponse(response.animal)
  }

  return response
}

function prepareResponseAll(rows) {
  return rows.map(row => prepareResponse(row))
}

export default {
  create: (req, res, next) => {
    const values = pick(permittedFields, req.body)

    // create a message in that conversation
    return Message.create({
      animalId: req.conversation.animalId,
      conversationId: req.conversation.id,
      text: values.text,
    })
      .then(() => {
        res.json({ status: 'ok' })
      })
      .catch(err => next(err))
  },
  findAll: (req, res, next) => {
    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = req.query

    // find related conversation
    return Message.findAndCountAll({
      where: {
        conversationId: req.params.resourceId,
      },
      include: [
        MessageBelongsToAnimal,
      ],
      limit,
      offset,
      order: [
        ['createdAt', 'DESC'],
      ],
    })
      .then(result => {
        res.json({
          data: prepareResponseAll(result.rows, req),
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          total: result.count,
        })
      })
      .catch(err => next(err))
  },
}
