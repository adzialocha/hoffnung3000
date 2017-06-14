import ActionTypes from '../actionTypes'
import { postRequest } from '../services/api'

export function deleteUser(email, password) {
  return postRequest(['auth', 'login'], { email, password }, {
    request: {
      type: ActionTypes.AUTH_LOGIN_REQUEST,
    },
    success: {
      type: ActionTypes.AUTH_LOGIN_SUCCESS,
    },
    failure: {
      type: ActionTypes.AUTH_LOGIN_FAILURE,
    },
  })
}

export function updateUser(email, password) {
  return postRequest(['auth', 'login'], { email, password }, {
    request: {
      type: ActionTypes.AUTH_LOGIN_REQUEST,
    },
    success: {
      type: ActionTypes.AUTH_LOGIN_SUCCESS,
    },
    failure: {
      type: ActionTypes.AUTH_LOGIN_FAILURE,
    },
  })
}
