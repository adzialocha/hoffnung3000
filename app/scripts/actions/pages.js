import ActionTypes from '../actionTypes'
import { getRequest } from '../services/api'

export function fetchHtmlPage(slug) {
  const meta = {
    slug,
  }

  return getRequest(['pages', slug], {}, {
    request: {
      type: ActionTypes.PAGE_REQUEST,
      meta,
    },
    success: {
      type: ActionTypes.PAGE_SUCCESS,
      meta,
    },
    failure: {
      type: ActionTypes.PAGE_FAILURE,
      meta,
    },
  })
}
