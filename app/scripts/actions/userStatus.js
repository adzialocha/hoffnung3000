import ActionTypes from '../actionTypes'
import { getRequest } from '../services/api'

export function updateStatus() {
  return (dispatch, getState) => {
    const state = getState()
    const lastRequestAt = state.userStatus.lastRequestAt
    const params = lastRequestAt ? { lastRequestAt } : {}

    return dispatch(
      getRequest(['status'], params, {
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
    )
  }
}
