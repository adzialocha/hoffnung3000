import ActionTypes from '../actionTypes'
import { getRequest } from '../services/api'

export function fetchResourceList(resourceType, data = {}) {
  const meta = {
    resourceType,
    data,
  }

  return getRequest([resourceType], data, {
    request: {
      type: ActionTypes.RESOURCE_LIST_REQUEST,
      meta,
    },
    success: {
      type: ActionTypes.RESOURCE_LIST_SUCCESS,
      meta,
    },
    failure: {
      type: ActionTypes.RESOURCE_LIST_FAILURE,
      meta,
    },
  })
}
