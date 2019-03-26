import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  lists: {},
}

const initialStateResource = {
  currentPageIndex: 0,
  isLoading: false,
  listItems: [],
  totalPageCount: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.INFINITE_LIST_CLEAR:
  case ActionTypes.INFINITE_LIST_INITIALIZE:
    return update(state, {
      [action.meta.path]: { $set: initialStateResource },
    })
  case ActionTypes.INFINITE_LIST_REQUEST:
    return update(state, {
      [action.meta.path]: {
        currentPageIndex: { $set: action.meta.page },
      },
    })
  case ActionTypes.INFINITE_LIST_SUCCESS:
    return update(state, {
      [action.meta.path]: {
        isLoading: { $set: false },
        listItems: { $push: action.payload.data },
        totalPageCount: {
          $set: Math.ceil(action.payload.total / action.payload.limit),
        },
      },
    })
  case ActionTypes.INFINITE_LIST_FAILURE:
    return update(state, {
      [action.meta.path]: {
        isLoading: { $set: false },
      },
    })
  default:
    return state
  }
}
