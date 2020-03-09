import update from 'immutability-helper'
import { LOCATION_CHANGE } from 'connected-react-router'

import ActionTypes from '../actionTypes'
import randomId from '../utils/randomId'

const initialState = {
  errorMessage: '',
  nextRandomId: randomId(),
  lists: {},
}

export const initialResourceListState = {
  isDirty: false,
  isError: false,
  isLoading: true,
  list: {},
}

function updateResourceList(state = initialState, action, isLoading, isDirty) {
  const { resourceType } = action.meta
  const { lists } = state

  let previousResourceState = initialResourceListState
  if (resourceType in lists) {
    previousResourceState = lists[resourceType]
  }

  const resourceState = {}

  if (typeof isLoading !== 'undefined') {
    resourceState.isLoading = { $set: isLoading }
  }

  if (typeof isDirty !== 'undefined') {
    resourceState.isDirty = { $set: isDirty }
  }

  const data = action.payload
  if (data && !action.error) {
    resourceState.list = { $set: data }
  }

  let errorMessage = ''
  if (action.error) {
    resourceState.isError = { $set: true }
    if ('message' in action.error) {
      errorMessage = action.error.message
    }
  } else {
    resourceState.isError = { $set: false }
  }

  return update(state, {
    errorMessage: { $set: errorMessage },
    lists: {
      $set: update(state.lists, {
        [resourceType]: {
          $set: update(state.lists[resourceType] || {}, {
            $set: update(previousResourceState, resourceState),
          }),
        },
      }),
    },
  })
}

export default (state = initialState, action) => {
  switch (action.type) {
  case LOCATION_CHANGE:
    return update(state, {
      errorMessage: { $set: '' },
    })
  case ActionTypes.RESOURCE_LIST_REQUEST: {
    return updateResourceList(state, action, true)
  }
  case ActionTypes.RESOURCE_LIST_SUCCESS: {
    return updateResourceList(state, action, false, false)
  }
  case ActionTypes.RESOURCE_LIST_FAILURE: {
    return updateResourceList(state, action, false)
  }
  default:
    return state
  }
}
