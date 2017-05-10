import update from 'react-addons-update'

import ActionTypes from '../actionTypes'
import { jwtDecode } from '../utils/jwt'

const initialState = {
  id: undefined,
  firstname: undefined,
  isAdmin: false,
  isParticipant: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.AUTH_LOGIN_SUCCESS: {
    const jwtPayload = jwtDecode(action.payload.token)
    const user = jwtPayload.user

    return update(state, {
      id: { $set: user.id },
      firstname: { $set: user.firstname },
      isAdmin: { $set: user.isAdmin },
      isParticipant: { $set: user.isParticipant },
    })
  }
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
