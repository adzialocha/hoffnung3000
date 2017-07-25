import ActionTypes from '../actionTypes'
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../services/api'
import { FLASH } from '../middlewares/flash'
import { REDIRECT } from '../middlewares/redirect'
import { SCROLL_TO_TOP } from '../middlewares/scroll'
import { translate } from '../services/i18n'

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

export function createResource(resourceType, resourceId, data, flash, redirect) {
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

  if (flash) {
    success[FLASH] = flash
  }

  return postRequest([resourceType], data, {
    request: {
      type: ActionTypes.RESOURCE_CREATE_REQUEST,
      meta,
    },
    success,
    failure: {
      [FLASH]: {
        text: translate('flash.resourceCreateFailure'),
        type: 'error',
      },
      [SCROLL_TO_TOP]: true,
      meta,
      type: ActionTypes.RESOURCE_CREATE_FAILURE,
    },
  })
}

export function updateResource(resourceType, resourceId, data, flash, redirect) {
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

  if (flash) {
    success[FLASH] = flash
  }

  return putRequest([resourceType, resourceId], data, {
    request: {
      type: ActionTypes.RESOURCE_UPDATE_REQUEST,
      meta,
    },
    success,
    failure: {
      [FLASH]: {
        text: translate('flash.resourceUpdateFailure'),
        type: 'error',
      },
      [SCROLL_TO_TOP]: true,
      meta,
      type: ActionTypes.RESOURCE_UPDATE_FAILURE,
    },
  })
}

export function deleteResource(resourceType, resourceId, flash, redirect) {
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

  if (flash) {
    success[FLASH] = flash
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
