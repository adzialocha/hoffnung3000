import update from 'react-addons-update'
import { LOCATION_CHANGE } from 'react-router-redux'

import ActionTypes from '../actionTypes'

const initialState = {
  isNavigationExpanded: false,
  isSidebarExpanded: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case LOCATION_CHANGE:
  case ActionTypes.DRAWER_COLLAPSE_ALL:
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
