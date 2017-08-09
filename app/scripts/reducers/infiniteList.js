import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  currentPageIndex: 0,
  isLoading: false,
  listItems: [],
  totalPageCount: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.INFINITE_LIST_INITIALIZE:
    return update(state, {
      currentPageIndex: { $set: 0 },
      isLoading: { $set: true },
      listItems: { $set: [] },
      totalPageCount: { $set: 0 },
    })
  case ActionTypes.INFINITE_LIST_REQUEST:
    return update(state, {
      currentPageIndex: { $set: action.meta.page },
      isLoading: { $set: true },
    })
  case ActionTypes.INFINITE_LIST_SUCCESS:
    return update(state, {
      isLoading: { $set: false },
      listItems: { $push: action.payload.data },
      totalPageCount: {
        $set: Math.ceil(action.payload.total / action.payload.limit),
      },
    })
  case ActionTypes.INFINITE_LIST_FAILURE:
    return update(state, {
      isLoading: { $set: false },
    })
  default:
    return state
  }
}
