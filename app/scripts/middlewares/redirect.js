import { push, replace } from 'connected-react-router'

export const REDIRECT = Symbol('app-redirect')
export const REPLACE = Symbol('app-replace')

export default store => next => action => {
  if (REDIRECT in action) {
    store.dispatch(push(action[REDIRECT]))
  } else if (REPLACE in action) {
    store.dispatch(replace(action[REPLACE]))
  }

  return next(action)
}
