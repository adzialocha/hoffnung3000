import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  config: {},
  errorMessage: '',
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
      errorMessage: { $set: '' },
      isLoading: { $set: true },
    })
  case ActionTypes.META_SUCCESS:
    return update(state, {
      config: { $set: action.payload.config },
      errorMessage: { $set: '' },
      status: {
        isRegistrationFull: { $set: action.payload.status.isRegistrationFull },
      },
      isLoading: { $set: false },
      isReady: { $set: true },
    })
  case ActionTypes.META_FAILURE:
    return update(state, {
      errorMessage: { $set: action.error.message },
      isLoading: { $set: false },
    })
  default:
    return state
  }
}
