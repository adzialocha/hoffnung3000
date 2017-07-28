import ActionTypes from '../actionTypes'
import { FLASH } from '../middlewares/flash'
import { postRequest } from '../services/api'
import { REDIRECT } from '../middlewares/redirect'
import { translate } from '../services/i18n'

export function createNewConversation(animalIds, title, text) {
  const params = {
    animalIds,
    text,
    title,
  }

  return postRequest(['inbox'], params, {
    request: {
      type: ActionTypes.INBOX_NEW_CONVERSATION_REQUEST,
    },
    success: {
      type: ActionTypes.INBOX_NEW_CONVERSATION_SUCCESS,
      [FLASH]: {
        text: translate('flash.createConversationSuccess'),
      },
      [REDIRECT]: '/inbox',
    },
    failure: {
      type: ActionTypes.INBOX_NEW_CONVERSATION_FAILURE,
    },
  })
}

export function sendNewMessage(conversationId, text) {
  const params = {
    text,
  }

  return postRequest(['conversations', conversationId], params, {
    request: {
      type: ActionTypes.INBOX_NEW_MESSAGE_REQUEST,
    },
    success: {
      type: ActionTypes.INBOX_NEW_MESSAGE_SUCCESS,
      [FLASH]: {
        text: translate('flash.newMessageSuccess'),
      },
    },
    failure: {
      type: ActionTypes.INBOX_NEW_MESSAGE_FAILURE,
    },
  })
}

export function initializeForm() {
  return {
    type: ActionTypes.INBOX_NEW_CONVERSATION_INITIALIZE,
  }
}
