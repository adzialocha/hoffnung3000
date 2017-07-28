import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  errorMessage: '',
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.INBOX_NEW_CONVERSATION_INITIALIZE:
    return initialState
  case ActionTypes.INBOX_NEW_CONVERSATION_REQUEST:
    return update(state, {
      errorMessage: { $set: '' },
      isLoading: { $set: true },
    })
  case ActionTypes.INBOX_NEW_CONVERSATION_SUCCESS:
    return update(state, {
      isLoading: { $set: false },
    })
  case ActionTypes.INBOX_NEW_CONVERSATION_FAILURE:
    return update(state, {
      errorMessage: { $set: action.error.message },
      isLoading: { $set: false },
    })
  default:
    return state
  }
}
