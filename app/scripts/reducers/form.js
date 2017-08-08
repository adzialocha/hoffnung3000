import { reducer as formReducer } from 'redux-form'

import ActionTypes from '../actionTypes'

export default formReducer.plugin({
  register: (state, action) => {
    switch (action.type) {
    case ActionTypes.AUTH_REGISTER_SUCCESS:
      return undefined
    default:
      return state
    }
  },
  ticket: (state, action) => {
    switch (action.type) {
    case ActionTypes.AUTH_TICKET_SUCCESS:
      return undefined
    default:
      return state
    }
  },
})
