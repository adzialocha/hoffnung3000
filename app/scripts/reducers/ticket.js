import update from 'immutability-helper'
import { LOCATION_CHANGE } from 'react-router-redux'

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
  case ActionTypes.TICKET_REQUEST:
    return update(state, {
      errorMessage: { $set: '' },
      isLoading: { $set: true },
    })
  case ActionTypes.TICKET_SUCCESS:
    if (action.meta.paymentMethod === 'paypal') {
      window.setTimeout(() => {
        window.location.assign(action.payload.redirect)
      })
      return state
    }
    return update(state, {
      isLoading: { $set: false },
    })
  case ActionTypes.TICKET_FAILURE:
    return update(state, {
      isLoading: { $set: false },
      errorMessage: { $set: action.error.message },
    })
  default:
    return state
  }
}
