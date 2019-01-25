import { replace } from 'connected-react-router'

import ActionTypes from '../actionTypes'
import flash from '../actions/flash'
import { translate } from '../../../common/services/i18n'

const CRITICAL_ERROR_CODES = [401, 403]
const ERROR_CODES = [404, 500]
const NOT_FOUND_ERROR_CODE = 404
const REDIRECT_404_PATH = '/404'
const REDIRECT_PATH = '/'

export default store => next => action => {
  if (action.type !== ActionTypes.API_FAILURE) {
    return next(action)
  }

  if (!action.error || !action.error.status) {
    return next(action)
  }

  if (ERROR_CODES.concat(CRITICAL_ERROR_CODES).includes(action.error.status)) {
    if (CRITICAL_ERROR_CODES.includes(action.error.status)) {
      store.dispatch(replace(REDIRECT_PATH))
    }

    if (action.error.status === NOT_FOUND_ERROR_CODE) {
      store.dispatch(replace(REDIRECT_404_PATH))
    } else {
      store.dispatch(flash({
        text: translate(`flash.apiErrorCodes.${action.error.status}`),
        type: 'error',
      }))
    }
  }

  return next(action)
}
