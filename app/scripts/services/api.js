import { API_REQUEST } from '../middlewares/api'

function request(path, method = 'GET', body = {}, types = {}) {
  return {
    [API_REQUEST]: {
      path,
      body,
      method,
      types,
    },
  }
}

export function getRequest(path, params, types) {
  return request(path, 'GET', params, types)
}

export function postRequest(path, body, types) {
  return request(path, 'POST', body, types)
}

export function putRequest(path, body, types) {
  return request(path, 'PUT', body, types)
}

export function deleteRequest(path, body, types) {
  return request(path, 'DELETE', body, types)
}
