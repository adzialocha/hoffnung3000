import ActionTypes from '../actionTypes'
import { jwtDecode } from '../utils/jwt'
import { postRequest } from '../services/api'

export function checkExistingToken(token) {
  const jwtPayload = jwtDecode(token)

  if (!jwtPayload || jwtPayload.exp < Date.now() / 1000 || !jwtPayload.user) {
    return {
      type: ActionTypes.AUTH_TOKEN_EXPIRED_OR_INVALID,
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

export function register(paymentMethod = 'paypal', data) {
  const meta = {
    paymentMethod,
  }

  const payload = {
    ...data,
    paymentMethod,
  }

  return postRequest(['auth', 'signup'], payload, {
    request: {
      type: ActionTypes.AUTH_REGISTER_REQUEST,
      meta,
    },
    success: {
      type: ActionTypes.AUTH_REGISTER_SUCCESS,
      meta,
    },
    failure: {
      type: ActionTypes.AUTH_REGISTER_FAILURE,
      meta,
    },
  })
}
