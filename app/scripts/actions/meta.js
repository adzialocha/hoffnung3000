import ActionTypes from '../actionTypes'
import { FLASH } from '../middlewares/flash'
import { getRequest, putRequest } from '../services/api'
import { translate } from '../../../common/services/i18n'

export function saveConfiguration(config) {
  return putRequest(['config'], config, {
    request: {
      type: ActionTypes.META_REQUEST,
    },
    success: {
      type: ActionTypes.META_SUCCESS,
      [FLASH]: {
        lifetime: 5000,
        text: translate('flash.updateAdminConfigSuccess'),
        type: 'rainbow',
      },
    },
    failure: {
      type: ActionTypes.META_FAILURE,
      [FLASH]: {
        text: translate('flash.updateAdminConfigFailure'),
        type: 'error',
      },
    },
  })
}

export function updateMetaInformation(isSensitive = false) {
  // Users with admin rights can request sensitive fields in config
  const resource = isSensitive ? 'config' : 'meta'

  return getRequest([resource], {}, {
    request: {
      type: ActionTypes.META_REQUEST,
    },
    success: {
      type: ActionTypes.META_SUCCESS,
    },
    failure: {
      type: ActionTypes.META_FAILURE,
    },
  })
}
