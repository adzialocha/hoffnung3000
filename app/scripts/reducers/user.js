import update from 'immutability-helper'

import ActionTypes from '../actionTypes'
import { jwtDecode } from '../utils/jwt'

const initialState = {
  errorMessage: '',
  username: '',
  id: undefined,
  isActive: false,
  isAdmin: false,
  isLoading: false,
  isParticipant: false,
  isVisitor: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.CHANGE_PROFILE_REQUEST:
    return update(state, {
      errorMessage: { $set: '' },
      isLoading: { $set: true },
    })
  case ActionTypes.CHANGE_PROFILE_SUCCESS:
  case ActionTypes.AUTH_LOGIN_SUCCESS: {
    const jwtPayload = jwtDecode(action.payload.token)
    const user = jwtPayload.user

    return update(state, {
      errorMessage: { $set: '' },
      username: { $set: user.username },
      id: { $set: user.id },
      isActive: { $set: user.isActive },
      isAdmin: { $set: user.isAdmin },
      isLoading: { $set: false },
      isParticipant: { $set: user.isParticipant },
      isVisitor: { $set: user.isVisitor },
    })
  }
  case ActionTypes.CHANGE_PROFILE_FAILURE:
    return update(state, {
      errorMessage: { $set: action.error.message },
      isLoading: { $set: false },
    })
  case ActionTypes.AUTH_LOGOUT:
  case ActionTypes.AUTH_LOGIN_FAILURE:
    return update(state, {
      errorMessage: { $set: '' },
      username: { $set: undefined },
      id: { $set: undefined },
      isActive: { $set: false },
      isAdmin: { $set: false },
      isLoading: { $set: false },
      isParticipant: { $set: false },
      isVisitor: { $set: false },
    })
  default:
    return state
  }
}
