import ActionTypes from '../actionTypes'

export function toggleNavigation() {
  return {
    type: ActionTypes.DRAWER_TOGGLE_NAVIGATION,
  }
}

export function toggleSidebar() {
  return {
    type: ActionTypes.DRAWER_TOGGLE_SIDEBAR,
  }
}

export function collapseAll() {
  return {
    type: ActionTypes.DRAWER_COLLAPSE_ALL,
  }
}
