import ActionTypes from '../actionTypes'
import { FLASH } from '../middlewares/flash'
import { putRequest } from '../services/api'
import { REDIRECT } from '../middlewares/redirect'

export function changeProfile(password, newPassword) {
  return putRequest(['profile'], { password, newPassword }, {
    request: {
      type: ActionTypes.CHANGE_PROFILE_REQUEST,
    },
    success: {
      type: ActionTypes.CHANGE_PROFILE_SUCCESS,
      [FLASH]: {
        text: 'Your profile was successfully updated!',
      },
      [REDIRECT]: '/',
    },
    failure: {
      type: ActionTypes.CHANGE_PROFILE_FAILURE,
    },
  })
}
