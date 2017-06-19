import update from 'immutability-helper'

import ActionTypes from '../actionTypes'
import { jwtDecode } from '../utils/jwt'

const initialState = {
  firstname: undefined,
  id: undefined,
  isActive: false,
  isAdmin: false,
  isParticipant: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.AUTH_REGISTER_SUCCESS: {
    const jwtPayload = jwtDecode(action.payload.token)
    const user = jwtPayload.user

    return update(state, {
      id: { $set: user.id },
      firstname: { $set: user.firstname },
      isActive: { $set: user.isActive },
      isParticipant: { $set: user.isParticipant },
    })
  }
  case ActionTypes.AUTH_LOGIN_SUCCESS: {
    const jwtPayload = jwtDecode(action.payload.token)
    const user = jwtPayload.user

    return update(state, {
      firstname: { $set: user.firstname },
      id: { $set: user.id },
      isActive: { $set: user.isActive },
      isAdmin: { $set: user.isAdmin },
      isParticipant: { $set: user.isParticipant },
    })
  }
  case ActionTypes.AUTH_LOGOUT:
  case ActionTypes.AUTH_LOGIN_FAILURE:
    return update(state, {
      firstname: { $set: undefined },
      id: { $set: undefined },
      isActive: { $set: false },
      isAdmin: { $set: false },
      isParticipant: { $set: false },
    })
  default:
    return state
  }
}
