import update from 'immutability-helper'
import { LOCATION_CHANGE } from 'react-router-redux'

import ActionTypes from '../actionTypes'

const initialState = {
  errorMessage: '',
  isLoading: false,
  pageData: {
    content: '',
    slug: '',
    title: '',
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
  case LOCATION_CHANGE:
    return update(state, {
      errorMessage: { $set: '' },
    })
  case ActionTypes.PAGE_CREATE_REQUEST:
  case ActionTypes.PAGE_EDIT_REQUEST:
    return update(state, {
      errorMessage: { $set: '' },
      isLoading: { $set: true },
    })
  case ActionTypes.PAGE_CREATE_SUCCESS:
    return update(state, {
      isLoading: { $set: false },
    })
  case ActionTypes.PAGE_EDIT_SUCCESS:
    return update(state, {
      isLoading: { $set: false },
      pageData: { $set: {
        content: action.payload.content,
        slug: action.payload.slug,
        title: action.payload.title,
      } },
    })
  case ActionTypes.PAGE_CREATE_FAILURE:
  case ActionTypes.PAGE_EDIT_FAILURE:
    return update(state, {
      errorMessage: { $set: action.error.message },
      isLoading: { $set: false },
    })
  default:
    return state
  }
}
