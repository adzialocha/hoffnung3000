import ActionTypes from '../actionTypes'
import { getRequest } from '../services/api'

export const ITEMS_PER_PAGE = 10

export function fetchList(resourceName, page = 0, params = {}, itemsPerPage = ITEMS_PER_PAGE) {
  const offset = page * itemsPerPage
  const limit = itemsPerPage
  const meta = {
    page,
    offset,
    limit,
  }

  const type = page === 0 ? ActionTypes.INFINITE_LIST_INITIALIZE : ActionTypes.INFINITE_LIST_REQUEST

  return getRequest([resourceName], { offset, limit, ...params }, {
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

export function clearList() {
  return {
    type: ActionTypes.INFINITE_LIST_INITIALIZE,
  }
}
