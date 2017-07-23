import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  isLoading: false,
  slots: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SLOTS_REQUEST:
    return update(state, {
      isLoading: { $set: true },
    })
  case ActionTypes.SLOTS_SUCCESS:
    return update(state, {
      slots: { $set: action.payload },
      isLoading: { $set: false },
    })
  case ActionTypes.SLOTS_FAILURE:
    return update(state, {
      isLoading: { $set: false },
    })
  default:
    return state
  }
}
