import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from './base'

// import {
//   ConversationBelongsToManyAnimal,
//   ConversationHasManyMessage,
// } from '../database/associations'

import Activity from '../models/activity'

export default {
  findAll: (req, res, next) => {
    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = req.query

    return Activity.findAndCountAll({
      limit,
      offset,
      order: [
        ['createdAt', 'DESC'],
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
  },
}
