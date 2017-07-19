import { actionTypes } from 'redux-form'

import flash from '../actions/flash'
import { translate } from '../services/i18n'

export default store => next => action => {
  if (action.type !== actionTypes.SET_SUBMIT_FAILED) {
    return next(action)
  }

  store.dispatch(flash({
    text: translate('flash.formSubmitError'),
    type: 'error',
  }))

  return next(action)
}
