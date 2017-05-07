import jwtDecode from 'jwt-decode'

import ActionTypes from '../actionTypes'
import { getRequest, postRequest } from '../services/api'

function successAction(token, user) {
  return {
    type: ActionTypes.AUTH_LOGIN_SUCCESS,
    token,
    user,
  }
}

export function loginSuccess(token, user) {
  const jwtPayload = jwtDecode(token)

  if (!jwtPayload || !jwtPayload.id) {
    return {
      type: ActionTypes.AUTH_LOGIN_FAILURE,
      errorMessage: 'Invalid token received',
    }
  }

  if (!user) {
    return (dispatch) => {
      getRequest(['users', jwtPayload.id])
        .then((userResponse) => {
          dispatch(successAction(token, userResponse))
        })
        .catch((errorMessage) => {
          dispatch({
            type: ActionTypes.AUTH_LOGIN_FAILURE,
            errorMessage,
          })
        })
    }
  }

  return successAction(token, user)
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
