import User from '../models/user'
import { sendRegistrationComplete } from '../helpers/mailTemplate'

export default function checkout(user) {
  return new Promise((resolve, reject) => {
    User.update({
      isActive: true,
    }, {
      where: { id: user.id },
      limit: 1,
      returning: true,
    })
      .then(data => {
        const updatedUser = data[1][0]

        sendRegistrationComplete({
          user: updatedUser,
        }, updatedUser.email)

        resolve({
          message: 'ok',
        })
      })
      .catch(err => reject(err))
  })
}
