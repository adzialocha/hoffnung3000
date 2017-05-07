import jwtDecode from 'jwt-decode'

import ActionTypes from '../actionTypes'
import { getRequest, postRequest } from '../services/api'

export function loginSuccess(token, user) {
  const decodedToken = jwtDecode(token)

  if (!decodedToken || !decodedToken.id) {
    return {
      type: ActionTypes.AUTH_LOGIN_FAILURE,
      errorMessage: 'Invalid token received',
    }
  }

  if (!user) {
    return (dispatch) => {
      getRequest(['users', decodedToken.id])
        .then((response) => {
          dispatch({
            type: ActionTypes.AUTH_LOGIN_SUCCESS,
            user: response,
            token,
          })
        })
        .catch((errorMessage) => {
          dispatch({
            type: ActionTypes.AUTH_LOGIN_FAILURE,
            errorMessage,
          })
        })
    }
  }

  return {
    type: ActionTypes.AUTH_LOGIN_SUCCESS,
    user,
    token,
  }
}

export function login(email, password) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.AUTH_LOGIN_REQUEST,
    })

    postRequest(['auth', 'login'], { email, password })
      .then((response) => {
        dispatch(loginSuccess(response.token, response.user))
      })
      .catch((errorMessage) => {
        dispatch({
          type: ActionTypes.AUTH_LOGIN_FAILURE,
          errorMessage,
        })
      })
  }
}

export function logout() {
  return {
    type: ActionTypes.AUTH_LOGOUT,
  }
}
