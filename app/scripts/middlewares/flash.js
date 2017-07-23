import flash from '../actions/flash'

export const FLASH = Symbol('app-flash')

export default store => next => action => {
  if (FLASH in action) {
    store.dispatch(flash(action[FLASH]))
  }

  return next(action)
}
