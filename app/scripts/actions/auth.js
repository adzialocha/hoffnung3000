import ActionTypes from '../actionTypes'
import flash from './flash'
import { FLASH } from '../middlewares/flash'
import { jwtDecode } from '../utils/jwt'
import { postRequest } from '../services/api'
import { REDIRECT } from '../middlewares/redirect'
import { routerActions } from 'react-router-redux'
import { translate } from '../services/i18n'

export function redirectWhenUnauthenticated(location) {
  return (dispatch) => {
    dispatch(
      flash({
        lifetime: 5000,
        text: translate('flash.redirectedUnauthenticated'),
        type: 'error',
      })
    )

    dispatch(routerActions.replace(location))
  }
}

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
      [FLASH]: {
        text: translate('flash.loginSuccess'),
      },
    },
    failure: {
      type: ActionTypes.AUTH_LOGIN_FAILURE,
    },
  })
}

export function logout() {
  return {
    type: ActionTypes.AUTH_LOGOUT,
    [FLASH]: {
      text: translate('flash.logout'),
    },
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

  const success = {
    type: ActionTypes.AUTH_REGISTER_SUCCESS,
    meta,
  }

  if (paymentMethod === 'transfer') {
    success[FLASH] = {
      lifetime: 30000,
      text: translate('flash.signUpTransferSuccess'),
    }
    success[REDIRECT] = '/'
  }

  return postRequest(['auth', 'signup'], payload, {
    request: {
      type: ActionTypes.AUTH_REGISTER_REQUEST,
      meta,
    },
    success,
    failure: {
      type: ActionTypes.AUTH_REGISTER_FAILURE,
      meta,
      [FLASH]: {
        text: translate('flash.signUpTransferFailure'),
      },
    },
  })
}

export function buyTicket(paymentMethod = 'paypal', data) {
  const meta = {
    paymentMethod,
  }

  const payload = {
    ...data,
    paymentMethod,
  }

  const success = {
    type: ActionTypes.TICKET_SUCCESS,
    meta,
  }

  if (paymentMethod === 'transfer') {
    success[FLASH] = {
      lifetime: 30000,
      text: translate('flash.signUpTransferTicketSuccess'),
    }
    success[REDIRECT] = '/'
  }

  return postRequest(['auth', 'signup', 'ticket'], payload, {
    request: {
      type: ActionTypes.TICKET_REQUEST,
      meta,
    },
    success,
    failure: {
      type: ActionTypes.TICKET_FAILURE,
      meta,
      [FLASH]: {
        text: translate('flash.signUpTransferFailure'),
      },
    },
  })
}

export function requestPasswordToken(email) {
  return postRequest(['auth', 'reset', 'request'], { email }, {
    request: {
      type: ActionTypes.RESET_PASSWORD_REQUEST,
    },
    success: {
      type: ActionTypes.RESET_PASSWORD_SUCCESS,
      [FLASH]: {
        lifetime: 30000,
        text: translate('flash.requestPasswordToken'),
      },
      [REDIRECT]: '/',
    },
    failure: {
      type: ActionTypes.RESET_PASSWORD_FAILURE,
    },
  })
}

export function resetPassword(password, token) {
  return postRequest(['auth', 'reset'], { password, token }, {
    request: {
      type: ActionTypes.RESET_PASSWORD_REQUEST,
    },
    success: {
      type: ActionTypes.RESET_PASSWORD_SUCCESS,
      [FLASH]: {
        text: translate('flash.resetPassword'),
      },
      [REDIRECT]: '/',
    },
    failure: {
      type: ActionTypes.RESET_PASSWORD_FAILURE,
    },
  })
}
