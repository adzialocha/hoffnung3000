import ActionTypes from '../actionTypes'
import { getRequest } from '../services/api'

export function updateStatus() {
  return getRequest(['status'], {}, {
    request: {
      type: ActionTypes.USER_STATUS_REQUEST,
    },
    success: {
      type: ActionTypes.USER_STATUS_SUCCESS,
    },
    failure: {
      type: ActionTypes.USER_STATUS_FAILURE,
    },
  })
}
