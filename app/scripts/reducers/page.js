import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  content: '',
  isError: false,
  isLoading: false,
  title: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.PAGE_REQUEST:
    return update(state, {
      isError: { $set: false },
      isLoading: { $set: true },
    })
  case ActionTypes.PAGE_SUCCESS:
    return update(state, {
      content: { $set: action.payload.content_html },
      isLoading: { $set: false },
      title: { $set: action.payload.title },
    })
  case ActionTypes.PAGE_FAILURE:
    return update(state, {
      isError: { $set: true },
      isLoading: { $set: false },
    })
  default:
    return state
  }
}
