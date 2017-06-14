import ActionTypes from '../actionTypes'
import { getRequest } from '../services/api'

const ITEMS_PER_PAGE = 10

export function fetchList(resourceName, page = 0) {
  const offset = page * ITEMS_PER_PAGE
  const limit = ITEMS_PER_PAGE
  const meta = {
    page,
    offset,
    limit,
  }

  return getRequest([resourceName], { offset, limit }, {
    request: {
      type: ActionTypes.PAGINATED_LIST_REQUEST,
      meta,
    },
    success: {
      type: ActionTypes.PAGINATED_LIST_SUCCESS,
      meta,
    },
    failure: {
      type: ActionTypes.PAGINATED_LIST_FAILURE,
      meta,
    },
  })
}
