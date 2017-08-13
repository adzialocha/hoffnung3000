import ActionTypes from '../actionTypes'
import flash from '../actions/flash'
import { translate } from '../../../common/services/i18n'
import { updateStatus } from '../actions/userStatus'

export const UPDATE_USER_STATUS = Symbol('app-update-user-status')

export default store => next => action => {
  if (UPDATE_USER_STATUS in action) {
    store.dispatch(updateStatus())
  }

  if (action.type === ActionTypes.USER_STATUS_SUCCESS) {
    if (action.payload.hasNewMessages) {
      store.dispatch(flash({
        text: translate('flash.notificationNewMessages', {
          count: action.payload.unreadMessagesCount,
        }),
        type: 'rainbow',
      }))
    }
  }

  return next(action)
}
