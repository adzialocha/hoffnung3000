import update from 'immutability-helper'
import { LOCATION_CHANGE } from 'react-router-redux'

import ActionTypes from '../actionTypes'

function randomId() {
  return `new-${Date.now()}-${Math.random().toString(36).substring(7)}`
}

const initialState = {
  errorMessage: '',
  nextRandomId: randomId(),
  objects: {},
}

export const initialResourceState = {
  isDirty: false,
  isError: false,
  isLoading: true,
  object: {},
}

function deleteResource(state, resourceType, resourceId) {
  return update(state, {
    objects: {
      $set: update(state.objects,
        {
          [resourceType]: {
            $set: Object.keys(state.objects[resourceType]).reduce(
              (result, key) => {
                if (key !== resourceId) {
                  result[key] = state.objects[resourceType][key]
                }
                return result
              }, {}),
          },
        },
      ),
    },
  })
}

function generateNewRandomId(state) {
  return update(state, {
    nextRandomId: { $set: randomId() },
  })
}

function updateResource(state, action, isLoading, isDirty) {
  const { resourceType, resourceId } = action.meta
  const { objects } = state

  let previousResourceState = initialResourceState
  if (resourceType in objects && resourceId in objects[resourceType]) {
    previousResourceState = objects[resourceType][resourceId]
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
    resourceState.object = { $set: data }
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
    objects: {
      $set: update(state.objects, {
        [resourceType]: {
          $set: update(state.objects[resourceType] || {}, {
            [resourceId]: {
              $set: update(previousResourceState, resourceState),
            },
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
  case ActionTypes.RESOURCE_REQUEST: {
    return updateResource(state, action, true)
  }
  case ActionTypes.RESOURCE_SUCCESS: {
    return updateResource(state, action, false, false)
  }
  case ActionTypes.RESOURCE_FAILURE: {
    return updateResource(state, action, false)
  }
  case ActionTypes.RESOURCE_CREATE_REQUEST: {
    const newState = generateNewRandomId(state)
    return updateResource(newState, action, true, true)
  }
  case ActionTypes.RESOURCE_CREATE_SUCCESS: {
    // delete temporarily created resource
    const { resourceType, resourceId } = action.meta
    const newState = deleteResource(state, resourceType, resourceId)
    // pass over the "real" remote object
    action.meta.resourceId = action.payload.id
    return updateResource(newState, action, false, false)
  }
  case ActionTypes.RESOURCE_CREATE_FAILURE: {
    return updateResource(state, action, false)
  }
  case ActionTypes.RESOURCE_UPDATE_REQUEST: {
    return updateResource(state, action, true, true)
  }
  case ActionTypes.RESOURCE_UPDATE_SUCCESS: {
    return updateResource(state, action, false, false)
  }
  case ActionTypes.RESOURCE_UPDATE_FAILURE: {
    return updateResource(state, action, false)
  }
  case ActionTypes.RESOURCE_DELETE_REQUEST: {
    return updateResource(state, action, true)
  }
  case ActionTypes.RESOURCE_DELETE_SUCCESS: {
    const { resourceType, resourceId } = action.meta
    return deleteResource(state, resourceType, resourceId)
  }
  case ActionTypes.RESOURCE_DELETE_FAILURE: {
    return updateResource(state, action, false)
  }
  default:
    return state
  }
}
