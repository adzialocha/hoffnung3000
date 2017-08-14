import ActionTypes from '../actionTypes'
import { FLASH } from '../middlewares/flash'
import { postRequest } from '../services/api'
import { REDIRECT } from '../middlewares/redirect'
import { translate } from '../../../common/services/i18n'
import { UPDATE_USER_STATUS } from '../middlewares/userStatus'

export function requestRandomMeeting(date) {
  return postRequest(['meeting'], { date }, {
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
