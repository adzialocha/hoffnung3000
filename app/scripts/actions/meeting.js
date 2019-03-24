import ActionTypes from '../actionTypes'
import { FLASH } from '../middlewares/flash'
import { REDIRECT } from '../middlewares/redirect'
import { UPDATE_USER_STATUS } from '../middlewares/userStatus'
import { postRequest } from '../services/api'
import { translate } from '../../../common/services/i18n'

export function requestRandomMeeting(date, isAnyDate) {
  return postRequest(['meeting'], { date, isAnyDate }, {
    request: {
      type: ActionTypes.RANDOM_MEETING_REQUEST,
    },
    success: {
      type: ActionTypes.RANDOM_MEETING_SUCCESS,
      [UPDATE_USER_STATUS]: true,
      [FLASH]: {
        lifetime: 5000,
        text: translate('flash.requestRandomMeetingSuccess'),
        type: 'rainbow',
      },
      [REDIRECT]: '/inbox',
    },
    failure: {
      type: ActionTypes.RANDOM_MEETING_FAILURE,
    },
  })
}
