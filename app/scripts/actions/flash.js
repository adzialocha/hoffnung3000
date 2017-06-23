import ActionTypes from '../actionTypes'

let counter = 0

export default function flash(options) {
  const { text, type = 'notification', lifetime } = options

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
