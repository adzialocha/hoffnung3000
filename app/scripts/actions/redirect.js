import ActionTypes from '../actionTypes'
import { REDIRECT } from '../middlewares/redirect'

export function redirectTo(to) {
  return {
    [REDIRECT]: to,
    type: ActionTypes.REDIRECT,
  }
}
