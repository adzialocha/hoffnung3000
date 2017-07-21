import ActionTypes from '../actionTypes'
import { getRequest } from '../services/api'

export function fetchSlots(placeSlug) {
  const meta = {
    placeSlug,
  }

  return getRequest(['places', placeSlug, 'slots'], {}, {
    request: {
      type: ActionTypes.SLOTS_REQUEST,
      meta,
    },
    success: {
      type: ActionTypes.SLOTS_SUCCESS,
      meta,
    },
    failure: {
      type: ActionTypes.SLOTS_FAILURE,
      meta,
    },
  })
}
