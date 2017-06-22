import User from '../models/user'

export const MAXIMUM_PARTICIPANTS = 30

function information(req, res, next) {
  User.count({
    where: {
      isParticipant: true,
    },
  })
    .then(count => {
      res.json({
        isRegistrationFull: count >= MAXIMUM_PARTICIPANTS,
      })
    })
    .catch(err => next(err))
}

export default {
  information,
}
