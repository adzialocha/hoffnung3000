import ActionTypes from '../actionTypes'
import { postRequest } from '../services/api'
import { UPDATE_USER_STATUS } from '../middlewares/userStatus'

export function requestRandomMeeting(date) {
  return postRequest(['meeting'], { date }, {
    request: {
      type: ActionTypes.RANDOM_MEETING_REQUEST,
    },
    success: {
      type: ActionTypes.RANDOM_MEETING_SUCCESS,
      [UPDATE_USER_STATUS]: true,
    },
    failure: {
      type: ActionTypes.RANDOM_MEETING_FAILURE,
    },
  })
}
