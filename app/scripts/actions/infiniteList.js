import ActionTypes from '../actionTypes'
import { getRequest } from '../services/api'

export const ITEMS_PER_PAGE = 10

export function fetchList(resourceName, page = 0) {
  const offset = page * ITEMS_PER_PAGE
  const limit = ITEMS_PER_PAGE
  const meta = {
    page,
    offset,
    limit,
  }

  const type = page === 0 ? ActionTypes.INFINITE_LIST_INITIALIZE : ActionTypes.INFINITE_LIST_REQUEST

  return getRequest([resourceName], { offset, limit }, {
    request: {
      type,
      meta,
    },
    success: {
      type: ActionTypes.INFINITE_LIST_SUCCESS,
      meta,
    },
    failure: {
      type: ActionTypes.INFINITE_LIST_FAILURE,
      meta,
    },
  })
}

