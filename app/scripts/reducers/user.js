import update from 'react-addons-update'

import ActionTypes from '../actionTypes'

const initialState = {
  id: undefined,
  firstname: undefined,
  isAdmin: false,
  isParticipant: false,
}

export default function modal(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.AUTH_LOGIN_SUCCESS:
    return update(state, {
      id: { $set: action.user.id },
      firstname: { $set: action.user.firstname },
      isAdmin: { $set: false },
      isParticipant: { $set: true },
    })
  case ActionTypes.AUTH_LOGOUT:
  case ActionTypes.AUTH_LOGIN_FAILURE:
    return update(state, {
      id: { $set: undefined },
      firstname: { $set: undefined },
      isAdmin: { $set: false },
      isParticipant: { $set: false },
    })
  default:
    return state
  }
}
