import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  pendingRequests: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.API_REQUEST:
    return update(state, {
      pendingRequests: { $set: state.pendingRequests + 1 },
    })
  case ActionTypes.API_SUCCESS:
    return update(state, {
      pendingRequests: { $set: state.pendingRequests - 1 },
    })
  case ActionTypes.API_FAILURE:
    return update(state, {
      pendingRequests: { $set: state.pendingRequests - 1 },
    })
  default:
    return state
  }
}
