import ActionTypes from '../actionTypes'

export function loginSuccess(token) {
  return {
    type: ActionTypes.AUTH_LOGIN_SUCCESS,
  }
}

export function logout() {
  return {
    type: ActionTypes.AUTH_LOGOUT,
  }
}
