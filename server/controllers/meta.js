import { getConfig } from '../config'

import User from '../models/user'

function information(req, res, next) {
  // @TODO Use this endpoint to serve configs
  return getConfig('maximumParticipantsCount')
    .then(config => {
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
    })
}

export default {
  information,
}
