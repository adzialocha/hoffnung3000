import ActionTypes from '../actionTypes'
import { postRequest } from '../services/api'

export function requestRandomMeeting(date) {
  return postRequest(['meeting'], { date }, {
    request: {
      type: ActionTypes.RANDOM_MEETING_REQUEST,
    },
    success: {
      type: ActionTypes.RANDOM_MEETING_SUCCESS,
    },
    failure: {
      type: ActionTypes.RANDOM_MEETING_FAILURE,
    },
  })
}
