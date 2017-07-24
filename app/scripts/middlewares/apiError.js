import { replace } from 'react-router-redux'

import ActionTypes from '../actionTypes'
import flash from '../actions/flash'
import { translate } from '../services/i18n'

const ERROR_CODES = [401, 403, 404, 500]
const CRITICAL_ERROR_CODES = [401]
const REDIRECT_PATH = '/'

export default store => next => action => {
  if (action.type !== ActionTypes.API_FAILURE) {
    return next(action)
  }

  if (!action.error || !action.error.status) {
    return next(action)
  }

  if (ERROR_CODES.includes(action.error.status)) {
    if (CRITICAL_ERROR_CODES.includes(action.error.status)) {
      store.dispatch(replace(REDIRECT_PATH))
    }

    store.dispatch(flash({
      text: translate(`flash.apiErrorCodes.${action.error.status}`),
      type: 'error',
    }))
  }

  return next(action)
}
