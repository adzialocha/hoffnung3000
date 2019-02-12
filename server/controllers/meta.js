import { getConfig } from '../config'

import User from '../models/user'

function information(req, res, next) {
  return getConfig()
    .then(config => {
      return User.count({
        where: {
          isParticipant: true,
        },
      })
        .then(count => {
          res.json({
            config,
            status: {
              isRegistrationFull: count >= config.maximumParticipantsCount,
            },
          })
        })
        .catch(err => next(err))
    })
}

export default {
  information,
}
