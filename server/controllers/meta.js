import config from '../../common/config'

import User from '../models/user'

function information(req, res, next) {
  return User.count({
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
