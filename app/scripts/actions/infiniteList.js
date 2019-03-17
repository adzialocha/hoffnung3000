import ActionTypes from '../actionTypes'
import { UPDATE_USER_STATUS } from '../middlewares/userStatus'
import { getRequest } from '../services/api'

export const ITEMS_PER_PAGE = 50

export function fetchList(path, page = 0, params = {}) {
  const offset = page * ITEMS_PER_PAGE
  const limit = ITEMS_PER_PAGE

  const meta = {
    limit,
    offset,
    page,
    path,
  }

  let type = ActionTypes.INFINITE_LIST_INITIALIZE
  if (page > 0) {
    type = ActionTypes.INFINITE_LIST_REQUEST
  }

  const requestPath = (typeof path === 'string') ? [path] : path

  const success = {
    type: ActionTypes.INFINITE_LIST_SUCCESS,
    meta,
  }

  if (requestPath[0] === 'conversations') {
    success[UPDATE_USER_STATUS] = true
  }

  return getRequest(requestPath, { offset, limit, ...params }, {
    request: {
      type,
      meta,
    },
    success,
    failure: {
      type: ActionTypes.INFINITE_LIST_FAILURE,
      meta,
    },
  })
}

export function clearList(path) {
  return {
    type: ActionTypes.INFINITE_LIST_CLEAR,
    meta: {
      path,
    },
  }
}
