import ActionTypes from '../actionTypes'
import { getRequest } from '../services/api'

export function updateMetaInformation() {
  return getRequest(['meta'], {}, {
    request: {
      type: ActionTypes.META_REQUEST,
    },
    success: {
      type: ActionTypes.META_SUCCESS,
    },
    failure: {
      type: ActionTypes.META_FAILURE,
    },
  })
}
