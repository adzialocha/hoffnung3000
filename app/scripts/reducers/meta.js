import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  isRegistrationFull: false,
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.META_REQUEST:
    return update(state, {
      isLoading: { $set: true },
    })
  case ActionTypes.META_SUCCESS:
    return update(state, {
      isRegistrationFull: { $set: action.payload.isRegistrationFull },
      isLoading: { $set: false },
    })
  case ActionTypes.META_FAILURE:
    return update(state, {
      isLoading: { $set: false },
    })
  default:
    return state
  }
}
