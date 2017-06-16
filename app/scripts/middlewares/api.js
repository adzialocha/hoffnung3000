import fetch from 'isomorphic-fetch'

import ActionTypes from '../actionTypes'
import parameterize from '../utils/parameterize'
import { getItem } from '../services/storage'

export const API_ENDPOINT = '/api/'
export const API_REQUEST = Symbol('app-api-request')

function getErrorMessage(error) {
  if (typeof error === 'string') {
    return {
      message: error,
      status: 500,
    }
  } else if (error && error.message) {
    return {
      message: error.message,
      status: error.status || 500,
    }
  }
  return {
    message: 'An unknown error occured',
    status: 500,
  }
}

function request(path, method = 'GET', body = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  const token = getItem('token')
  if (token) {
    defaultHeaders.Authorization = `JWT ${token}`
  }

  const options = {
    method,
    headers: new Headers(
      Object.assign({}, defaultHeaders)
    ),
    credentials: Object.keys(body).includes('password') ? 'include' : 'omit',
  }

  let paramsStr = ''

  if (method === 'GET') {
    paramsStr = parameterize(body)
  } else {
    options.body = JSON.stringify(body)
  }

  return new Promise((resolve, reject) => {
    fetch(`${API_ENDPOINT}${path.join('/')}${paramsStr}`, options)
      .then((response) => {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          response.json().then((json) => {
            if (response.status !== 200) {
              reject(getErrorMessage(json))
            } else {
              resolve(json)
            }
          })
        } else {
          reject(getErrorMessage())
        }
      })
      .catch((error) => {
        reject(getErrorMessage(error))
      })
  })
}

export default store => next => action => {
  if (!(API_REQUEST in action)) {
    return next(action)
  }

  const { path, method, body, types } = action[API_REQUEST]

  store.dispatch({
    type: ActionTypes.API_REQUEST,
  })

  if (types.request) {
    if ('type' in types.request) {
      store.dispatch({ ...types.request })
    }
  }

  return request(path, method, body)
    .then((payload) => {
      store.dispatch({
        type: ActionTypes.API_SUCCESS,
        payload,
      })

      if (types.success) {
        if ('type' in types.success) {
          store.dispatch({ ...types.success, payload })
        }
      }
    })
    .catch((error) => {
      store.dispatch({
        type: ActionTypes.API_FAILURE,
        error,
      })

      if (types.failure) {
        if ('type' in types.request) {
          store.dispatch({ ...types.failure, error })
        }
      }
    })
}
