import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  isLoading: false,
  listItems: [],
  totalPageCount: 0,
}

function sortItems(list) {
  return list.sort((listItemA, listItemB) => {
    return listItemA.id - listItemB.id
  })
}

function remoteItem(state, resourceId) {
  return state.listItems.filter((listItem) => {
    return listItem.id !== resourceId
  })
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.PAGINATED_LIST_REQUEST:
    return update(state, {
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
  case ActionTypes.PAGINATED_LIST_REMOVE_ITEM:
    return update(state, {
      listItems: { $set: remoteItem(state, action.resourceId) },
    })
  default:
    return state
  }
}
