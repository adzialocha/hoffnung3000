import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  config: {},
  status: {
    isRegistrationFull: false,
  },
  isLoading: false,
  isReady: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.META_REQUEST:
    return update(state, {
      isLoading: { $set: true },
    })
  case ActionTypes.META_SUCCESS:
    return update(state, {
      config: { $set: action.payload.config },
      status: {
        isRegistrationFull: { $set: action.payload.status.isRegistrationFull },
      },
      isLoading: { $set: false },
      isReady: { $set: true },
    })
  case ActionTypes.META_FAILURE:
    return update(state, {
      isLoading: { $set: false },
    })
  default:
    return state
  }
}
