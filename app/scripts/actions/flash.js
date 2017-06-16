import ActionTypes from '../actionTypes'

let counter = 0

export default function flash(text, type = 'notification', lifetime) {
  return {
    type: ActionTypes.FLASH_ADD_MESSAGE,
    message: {
      id: ++counter,
      lifetime,
      text,
      type,
    },
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
  return flash(text, 'notification', lifetime)
}

export function warning(text, lifetime) {
  return flash(text, 'warning', lifetime)
}

export function error(text, lifetime) {
  return flash(text, 'error', lifetime)
}
