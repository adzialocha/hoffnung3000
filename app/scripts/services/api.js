import fetch from 'isomorphic-fetch'

import { getItem } from '../utils/storage'

const API_ENDPOINT = '/api/'

function getErrorMessage(error) {
  if (typeof error === 'string') {
    return error
  } else if (error && error.message) {
    return error.message
  }
  return 'An unknown error occured'
}

function request(path, method = 'GET', body = {}, headers = {}) {
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
      Object.assign({}, defaultHeaders, headers)
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

export function getRequest(path) {
  return request(path)
}

export function postRequest(path, body) {
  return request(path, 'POST', body)
}

export function putRequest(path, body) {
  return request(path, 'PUT', body)
}

export function deleteRequest(path, body) {
  return request(path, 'DELETE', body)
}
