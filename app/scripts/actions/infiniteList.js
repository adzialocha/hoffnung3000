import ActionTypes from '../actionTypes'
import { getRequest } from '../services/api'
import { UPDATE_USER_STATUS } from '../middlewares/userStatus'

export const ITEMS_PER_PAGE = 50
export const MANY_ITEMS_PER_PAGE = 500

export function fetchList(path, page = 0, params = {}) {
  let offset = page * ITEMS_PER_PAGE
  let limit = ITEMS_PER_PAGE
  const meta = {
    page,
    offset,
    limit,
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

  // this is a quick hack fixing a wierd SQL issue
  if (
    requestPath[0] === 'conversations' ||
    requestPath[0] === 'events' ||
    requestPath[0] === 'preview'
  ) {
    offset = page * MANY_ITEMS_PER_PAGE
    limit = MANY_ITEMS_PER_PAGE
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

export function clearList() {
  return {
    type: ActionTypes.INFINITE_LIST_INITIALIZE,
  }
}
