import ActionTypes from '../actionTypes'
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../services/api'

import { REDIRECT } from '../middlewares/api'

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

export function fetchPage(slug) {
  return getRequest(['pages', slug], {}, {
    request: {
      type: ActionTypes.PAGE_EDIT_REQUEST,
    },
    success: {
      type: ActionTypes.PAGE_EDIT_SUCCESS,
    },
    failure: {
      type: ActionTypes.PAGE_EDIT_FAILURE,
    },
  })
}

export function createNewPage(title, slug, content) {
  return postRequest(['pages'], { title, slug, content }, {
    request: {
      type: ActionTypes.PAGE_CREATE_REQUEST,
    },
    success: {
      type: ActionTypes.PAGE_CREATE_SUCCESS,
      [REDIRECT]: '/admin/pages/all',
    },
    failure: {
      type: ActionTypes.PAGE_CREATE_FAILURE,
    },
  })
}

export function updatePage(title, slug, content) {
  return putRequest(['pages', slug], { title, slug, content }, {
    request: {
      type: ActionTypes.PAGE_EDIT_REQUEST,
    },
    success: {
      type: ActionTypes.PAGE_EDIT_SUCCESS,
      [REDIRECT]: '/admin/pages/all',
    },
    failure: {
      type: ActionTypes.PAGE_EDIT_FAILURE,
    },
  })
}

export function deletePage(slug) {
  return deleteRequest(['pages', slug], {}, {
    success: {
      [REDIRECT]: '/admin/pages/all',
    },
  })
}
