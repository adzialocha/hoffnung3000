import fetch from 'isomorphic-fetch'

import ActionTypes from '../actionTypes'
import { getItem } from '../utils/storage'

export const API_ENDPOINT = '/api/'
export const API_REQUEST = Symbol('api-request')

function getErrorMessage(error) {
  if (typeof error === 'string') {
    return error
  } else if (error && error.message) {
    return error.message
  }
  return 'An unknown error occured'
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

  if (method !== 'GET') {
    options.body = JSON.stringify(body)
  }

  return new Promise((resolve, reject) => {
    fetch(API_ENDPOINT + path.join('/'), options)
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
    store.dispatch({ ...types.request })
  }

  return request(path, method, body)
    .then((payload) => {
      store.dispatch({
        type: ActionTypes.API_SUCCESS,
        payload,
      })

      if (types.success) {
        store.dispatch({ ...types.success, payload })
      }
    })
    .catch((errorMessage) => {
      store.dispatch({
        type: ActionTypes.API_FAILURE,
        errorMessage,
      })

      if (types.failure) {
        store.dispatch({ ...types.failure, errorMessage })
      }
    })
}
