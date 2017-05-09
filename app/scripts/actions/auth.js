import jwtDecode from 'jwt-decode'

import ActionTypes from '../actionTypes'
import { postRequest } from '../services/api'

export function checkExistingToken(token) {
  const jwtPayload = jwtDecode(token)

  if (jwtPayload.exp < Date.now() / 1000) {
    return {
      type: ActionTypes.AUTH_LOGIN_FAILURE,
      errorMessage: 'Token expired',
    }
  }

  return {
    type: ActionTypes.AUTH_LOGIN_SUCCESS,
    payload: {
      token,
    },
  }
}

export function login(email, password) {
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

export function logout() {
  return {
    type: ActionTypes.AUTH_LOGOUT,
  }
}
