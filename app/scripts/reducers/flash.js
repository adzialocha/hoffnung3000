import update from 'immutability-helper'

import ActionTypes from '../actionTypes'

const initialState = {
  messages: [],
}

export default function flash(state = initialState, action) {
  switch (action.type) {
  case ActionTypes.FLASH_ADD_MESSAGE:
    return update(state, {
      messages: { $push: [action.message] },
    })
  case ActionTypes.FLASH_REMOVE_MESSAGE:
    const index = state.messages.findIndex(item => {
      return item.id === action.message.id
    })
    if (index === -1) {
      return state
    }
    return update(state, {
      messages: { $splice: [[index, 1]] },
    })
  case ActionTypes.FLASH_REMOVE_ALL_MESSAGES:
    return update(state, {
      messages: { $set: [] },
    })
  default:
    return state
  }
}
