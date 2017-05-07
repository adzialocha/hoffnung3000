import update from 'react-addons-update'

import ActionTypes from '../actionTypes'
import { setItem, removeItem } from '../utils/storage'

const initialState = {
  errorMessage: '',
  isLoading: false,
  isAuthenticated: false,
}

export default function modal(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.AUTH_LOGIN_REQUEST:
    return update(state, {
      isLoading: { $set: true },
      errorMessage: { $set: '' },
    })
  case ActionTypes.AUTH_LOGIN_SUCCESS:
    setItem('token', action.token)
    return update(state, {
      isLoading: { $set: false },
      isAuthenticated: { $set: true },
    })
  case ActionTypes.AUTH_LOGIN_FAILURE:
    removeItem('token')
    return update(state, {
      isLoading: { $set: false },
      isAuthenticated: { $set: false },
      errorMessage: { $set: action.errorMessage },
    })
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
