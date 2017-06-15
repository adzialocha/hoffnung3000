import ActionTypes from '../actionTypes'
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../services/api'

import { REDIRECT } from '../middlewares/api'

export function fetchResource(resourceType, resourceId) {
  const meta = {
    resourceId,
    resourceType,
  }

  return getRequest([resourceType, resourceId], {}, {
    request: {
      type: ActionTypes.RESOURCE_REQUEST,
      meta,
    },
    success: {
      type: ActionTypes.RESOURCE_SUCCESS,
      meta,
    },
    failure: {
      type: ActionTypes.RESOURCE_FAILURE,
      meta,
    },
  })
}

export function createResource(resourceType, resourceId, data, redirect) {
  const meta = {
    data,
    resourceId,
    resourceType,
  }

  const success = {
    type: ActionTypes.RESOURCE_CREATE_SUCCESS,
    meta,
  }

  if (redirect) {
    success[REDIRECT] = redirect
  }

  return postRequest([resourceType], data, {
    request: {
      type: ActionTypes.RESOURCE_CREATE_REQUEST,
      meta,
    },
    success,
    failure: {
      type: ActionTypes.RESOURCE_CREATE_FAILURE,
      meta,
    },
  })
}

export function updateResource(resourceType, resourceId, data, redirect) {
  delete data.createdAt
  delete data.id
  delete data.updatedAt

  const meta = {
    data,
    resourceId,
    resourceType,
  }

  const success = {
    type: ActionTypes.RESOURCE_UPDATE_SUCCESS,
    meta,
  }

  if (redirect) {
    success[REDIRECT] = redirect
  }

  return putRequest([resourceType, resourceId], data, {
    request: {
      type: ActionTypes.RESOURCE_UPDATE_REQUEST,
      meta,
    },
    success,
    failure: {
      type: ActionTypes.RESOURCE_UPDATE_FAILURE,
      meta,
    },
  })
}

export function deleteResource(resourceType, resourceId, redirect) {
  const meta = {
    resourceId,
    resourceType,
  }

  const success = {
    type: ActionTypes.RESOURCE_DELETE_SUCCESS,
    meta,
  }

  if (redirect) {
    success[REDIRECT] = redirect
  }

  return deleteRequest([resourceType, resourceId], {}, {
    request: {
      type: ActionTypes.RESOURCE_DELETE_REQUEST,
      meta,
    },
    success,
    failure: {
      type: ActionTypes.RESOURCE_DELETE_FAILURE,
      meta,
    },
  })
}
