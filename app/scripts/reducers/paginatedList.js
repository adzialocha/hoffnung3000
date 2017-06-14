import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  currentPageIndex: 0,
  isLoading: false,
  listItems: [],
  totalPageCount: 0,
}

function sortItems(list) {
  return list.sort((listItemA, listItemB) => {
    return listItemA.id - listItemB.id
  })
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.PAGINATED_LIST_REQUEST:
    return update(state, {
      currentPageIndex: { $set: action.meta.page },
      isLoading: { $set: true },
    })
  case ActionTypes.PAGINATED_LIST_SUCCESS:
    return update(state, {
      isLoading: { $set: false },
      listItems: { $set: sortItems(action.payload.data) },
      totalPageCount: {
        $set: Math.floor((action.payload.total - 1) / action.payload.limit),
      },
    })
  case ActionTypes.PAGINATED_LIST_FAILURE:
    return update(state, {
      isLoading: { $set: false },
    })
  default:
    return state
  }
}
