import { push } from 'react-router-redux'

export const REDIRECT = Symbol('app-redirect')

export default store => next => action => {
  if (!(REDIRECT in action)) {
    return next(action)
  }
  store.dispatch(push(action[REDIRECT]))
  return next(action)
}
