import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  meetingErrorMessage: '',
  isMeetingLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.DRAWER_TOGGLE_SIDEBAR:
  case ActionTypes.DRAWER_COLLAPSE_ALL:
    return update(state, {
      meetingErrorMessage: { $set: '' },
    })
  case ActionTypes.RANDOM_MEETING_REQUEST:
    return update(state, {
      meetingErrorMessage: { $set: '' },
      isMeetingLoading: { $set: true },
    })
  case ActionTypes.RANDOM_MEETING_SUCCESS:
    return update(state, {
      isMeetingLoading: { $set: false },
    })
  case ActionTypes.RANDOM_MEETING_FAILURE:
    return update(state, {
      isMeetingLoading: { $set: false },
      meetingErrorMessage: { $set: action.error.message },
    })
  default:
    return state
  }
}
