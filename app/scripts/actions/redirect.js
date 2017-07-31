import ActionTypes from '../actionTypes'
import { REDIRECT, REPLACE } from '../middlewares/redirect'

export function redirectTo(to) {
  return {
    [REDIRECT]: to,
    type: ActionTypes.REDIRECT,
  }
}

export function replaceTo(to) {
  return {
    [REPLACE]: to,
    type: ActionTypes.REPLACE,
  }
}
