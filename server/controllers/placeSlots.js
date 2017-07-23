import Slot from '../models/slot'

export default {
  findAll: (req, res, next) => {
    return Slot.findAll({
      where: {
        placeId: req.resourceId,
      },
    })
      .then(data => res.json(data))
      .catch(err => next(err))
  },
}
