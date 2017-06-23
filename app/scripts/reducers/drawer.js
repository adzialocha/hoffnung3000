import update from 'immutability-helper'
import { LOCATION_CHANGE } from 'react-router-redux'

import ActionTypes from '../actionTypes'

const initialState = {
  isNavigationExpanded: false,
  isSidebarExpanded: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.AUTH_LOGOUT:
  case ActionTypes.DRAWER_COLLAPSE_ALL:
  case LOCATION_CHANGE:
    return update(state, {
      isNavigationExpanded: { $set: false },
      isSidebarExpanded: { $set: false },
    })
  case ActionTypes.DRAWER_TOGGLE_NAVIGATION:
    return update(state, {
      isNavigationExpanded: { $set: !state.isNavigationExpanded },
      isSidebarExpanded: { $set: false },
    })
  case ActionTypes.DRAWER_TOGGLE_SIDEBAR:
    return update(state, {
      isNavigationExpanded: { $set: false },
      isSidebarExpanded: { $set: !state.isSidebarExpanded },
    })
  default:
    return state
  }
}
