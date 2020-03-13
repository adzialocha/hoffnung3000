import update from 'immutability-helper'
import { LOCATION_CHANGE } from 'connected-react-router'

import ActionTypes from '../actionTypes'
import { setItem, removeItem } from '../services/storage'

const CRITICAL_API_ERROR_CODES = [401, 403]

const initialState = {
  errorMessage: '',
  isLoading: false,
  isAuthenticated: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.AUTH_LOGIN_REQUEST:
  case ActionTypes.AUTH_RESET_PASSWORD_REQUEST:
  case ActionTypes.AUTH_REGISTER_REQUEST:
    return update(state, {
      errorMessage: { $set: '' },
      isLoading: { $set: true },
    })
  case LOCATION_CHANGE:
    return update(state, {
      errorMessage: { $set: '' },
    })
  case ActionTypes.AUTH_REGISTER_SUCCESS:
    return update(state, {
      isLoading: { $set: false },
    })
  case ActionTypes.AUTH_LOGIN_SUCCESS:
    setItem('token', action.payload.token)
    return update(state, {
      isLoading: { $set: false },
      isAuthenticated: { $set: true },
      errorMessage: { $set: '' },
    })
  case ActionTypes.AUTH_RESET_PASSWORD_SUCCESS:
    return update(state, {
      isLoading: { $set: false },
      errorMessage: { $set: '' },
    })
  case ActionTypes.AUTH_REGISTER_FAILURE:
  case ActionTypes.AUTH_LOGIN_FAILURE:
    removeItem('token')
    return update(state, {
      isLoading: { $set: false },
      isAuthenticated: { $set: false },
      errorMessage: { $set: action.error.message },
    })
  case ActionTypes.AUTH_RESET_PASSWORD_FAILURE:
    return update(state, {
      isLoading: { $set: false },
      errorMessage: { $set: action.error.message },
    })
  case ActionTypes.API_FAILURE: {
    if (CRITICAL_API_ERROR_CODES.includes(action.error.status)) {
      removeItem('token')
      return update(state, {
        isLoading: { $set: false },
        isAuthenticated: { $set: false },
      })
    }
    return state
  }
  case ActionTypes.AUTH_TOKEN_EXPIRED_OR_INVALID:
  case ActionTypes.AUTH_LOGOUT:
    removeItem('token')
    return update(state, {
      isLoading: { $set: false },
      isAuthenticated: { $set: false },
    })
  default:
    return state
  }
}
