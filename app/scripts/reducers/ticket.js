import update from 'immutability-helper'
import { LOCATION_CHANGE } from 'connected-react-router'

import ActionTypes from '../actionTypes'

const initialState = {
  errorMessage: '',
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case LOCATION_CHANGE:
    return update(state, {
      errorMessage: { $set: '' },
    })
  case ActionTypes.AUTH_TICKET_REQUEST:
    return update(state, {
      errorMessage: { $set: '' },
      isLoading: { $set: true },
    })
  case ActionTypes.AUTH_TICKET_SUCCESS:
    return update(state, {
      isLoading: { $set: false },
    })
  case ActionTypes.AUTH_TICKET_FAILURE:
    return update(state, {
      isLoading: { $set: false },
      errorMessage: { $set: action.error.message },
    })
  default:
    return state
  }
}
