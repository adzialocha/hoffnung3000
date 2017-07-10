import ActionTypes from '../actionTypes'
import { FLASH } from '../middlewares/flash'
import { jwtDecode } from '../utils/jwt'
import { postRequest } from '../services/api'
import { REDIRECT } from '../middlewares/redirect'

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
        text: 'Welcome!',
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
      text: 'Goodbye! See you soon!',
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
      text: 'Thank you for your registration! We just sent you an email with our bank account details! Please contact us if you didn\'t receive the mail in the next minutes or you have any questions.',
      lifetime: 30000,
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
        text: 'Something with the registration went wrong',
      },
    },
  })
}
