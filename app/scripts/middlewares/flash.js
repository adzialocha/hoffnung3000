import flash from '../actions/flash'

export const FLASH = Symbol('app-flash')

export default store => next => action => {
  if (!(FLASH in action)) {
    return next(action)
  }

  const { text, type, lifetime } = action[FLASH]
  store.dispatch(flash(text, type, lifetime))

  return next(action)
}
