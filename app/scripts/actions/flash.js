import ActionTypes from '../actionTypes'
import { redirectTo } from './redirect'

let counter = 0

export default function flash(options) {
  const { text, type = 'notification', lifetime, redirect } = options

  return (dispatch) => {
    dispatch({
      type: ActionTypes.FLASH_ADD_MESSAGE,
      message: {
        id: ++counter,
        lifetime,
        text,
        type,
      },
    })

    if (redirect) {
      dispatch(redirectTo(redirect))
    }
  }
}

export function removeMessage(id) {
  return {
    type: ActionTypes.FLASH_REMOVE_MESSAGE,
    message: {
      id,
    },
  }
}

export function removeAllMessages() {
  return {
    type: ActionTypes.FLASH_REMOVE_ALL_MESSAGES,
  }
}

export function notification(text, lifetime) {
  return flash({ text, type: 'notification', lifetime })
}

export function warning(text, lifetime) {
  return flash({ text, type: 'warning', lifetime })
}

export function error(text, lifetime) {
  return flash({ text, type: 'error', lifetime })
}

export function rainbow(text, lifetime) {
  return flash({ text, type: 'rainbow', lifetime })
}
