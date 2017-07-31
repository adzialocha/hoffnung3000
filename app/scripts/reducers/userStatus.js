import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  isLoading: false,
  latestActivities: [],
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
      latestActivities: { $set: action.payload.latestActivities },
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
