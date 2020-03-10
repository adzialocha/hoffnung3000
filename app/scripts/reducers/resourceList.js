import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  isLoading: false,
  resourceListItems: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.RESOURCE_LIST_REQUEST:
    return update(state, {
      isLoading: { $set: true },
    })
  case ActionTypes.RESOURCE_LIST_SUCCESS:
    return update(state, {
      isLoading: { $set: false },
      resourceListItems: { $set: action.payload.data },
    })
  case ActionTypes.RESOURCE_LIST_FAILURE:
    return update(state, {
      isLoading: { $set: false },
    })
  default:
    return state
  }
}
