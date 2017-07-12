import config from '../../config'
import User from '../models/user'

function information(req, res, next) {
  User.count({
    where: {
      isParticipant: true,
    },
  })
    .then(count => {
      res.json({
        isRegistrationFull: count >= config.maximumParticipantsCount,
      })
    })
    .catch(err => next(err))
}

export default {
  information,
}
