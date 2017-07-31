import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  isLoading: false,
  unreadMessagesCount: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.USER_STATUS_REQUEST:
    return update(state, {
      isLoading: { $set: true },
    })
  case ActionTypes.USER_STATUS_SUCCESS:
    return update(state, {
      isLoading: { $set: false },
      unreadMessagesCount: { $set: action.payload.unreadMessagesCount },
    })
  case ActionTypes.USER_STATUS_FAILURE:
    return update(state, {
      isLoading: { $set: false },
    })
  default:
    return state
  }
}
