import moment from 'moment-timezone'

import config from '../config'
import { translate } from '../services/i18n'

const TIME_FORMAT = 'HH:mm'

function addSlotDuration(date, slotSize) {
  return moment(date).add(slotSize, 'minutes')
}

export function isInFestivalRange(date) {
  return moment(date).isBetween(
    config.festivalDateStart,
    config.festivalDateEnd
  )
}

export function checkSlotSize(slotSize) {
  let errorMessage

  if (!slotSize) {
    errorMessage = translate('forms.place.errors.slotSizeRequired')
  }

  if (slotSize > 1440) {
    errorMessage = translate('forms.place.errors.slotSizeMaximum')
  } else if (slotSize < 1) {
    errorMessage = translate('forms.place.errors.slotSizeMinimum')
  }

  return {
    errorMessage,
    isValid: (errorMessage === undefined),
  }
}

export function numberToSlotSizeStrHuman(num) {
  const hours = Math.floor(num / 60)
  const minutes = num - (hours * 60)

  let hoursStr = ''
  let minutesStr = ''

  if (hours > 0) {
    hoursStr = translate('common.hoursHuman', {
      count: hours,
    }) + ' '
  }

  if (minutes > 0) {
    minutesStr = translate('common.minutesHuman', {
      count: minutes,
    }) + ' '
  }

  const andStr = hours > 0 && minutes > 0 ? 'and ' : ''

  return [hoursStr, andStr, minutesStr].join('')
}

export function getDisabledSlotIndexes(slots) {
  return slots.reduce((acc, slot) => {
    if (slot.isDisabled) {
      acc.push(slot.slotIndex)
    }
    return acc
  }, [])
}

export function getSlotWithIndex(slots, slotIndex) {
  return slots.find((slot) => slot.slotIndex === slotIndex)
}

export function generateNewSlotItems(slotSize, existingSlots) {
  const slotItems = []

  if (!checkSlotSize(slotSize).isValid) {
    return slotItems
  }

  let existingSlotDisabledStates = {}
  let existingSlotEventIdStates = {}

  if (existingSlots) {
    existingSlotDisabledStates = existingSlots.reduce((acc, slot) => {
      acc[slot.slotIndex] = slot.isDisabled
      return acc
    }, {})

    existingSlotEventIdStates = existingSlots.reduce((acc, slot) => {
      acc[slot.slotIndex] = slot.eventId
      return acc
    }, {})
  }

  let slotIndex = 0
  let from = moment(config.festivalDateStart)
  let to = addSlotDuration(from, slotSize)

  while (isInFestivalRange(to)) {
    slotItems.push({
      eventId: existingSlotEventIdStates[slotIndex],
      from,
      fromTimeStr: moment(from).format(TIME_FORMAT),
      isDisabled: existingSlotDisabledStates[slotIndex] || false,
      slotIndex,
      to,
      toTimeStr: moment(to).format(TIME_FORMAT),
    })

    slotIndex += 1
    from = addSlotDuration(from, slotSize)
    to = addSlotDuration(from, slotSize)
  }

  return slotItems
}

export function getSlotTimes(slotSize, slotIndex) {
  const date = config.festivalDateStart
  return {
    from: moment(date).add(slotSize * slotIndex, 'minutes'),
    to: moment(date).add(slotSize * (slotIndex + 1), 'minutes'),
  }
}

export function isInClosedOrder(arr) {
  if (arr.length < 2) {
    return true
  }

  arr.sort((valA, valB) => valA - valB)

  return !arr.some((currentItem, index) => {
    const nextItem = arr[index + 1]
    return nextItem && nextItem !== currentItem + 1
  })
}

export function createEventSlots(slotIndexes, placeId, eventId, slotSize) {
  slotIndexes.sort((slotA, slotB) => slotA - slotB)
  return slotIndexes.map(slotIndex => {
    const { from, to } = getSlotTimes(slotSize, slotIndex)
    return {
      eventId,
      from,
      placeId,
      slotIndex,
      to,
    }
  })
}

export function createDisabledSlots(slotIndexes, placeId, slotSize) {
  return slotIndexes.map((slotIndex) => {
    const { from, to } = getSlotTimes(slotSize, slotIndex)
    const slot = {
      from,
      to,
      slotIndex,
      isDisabled: true,
    }

    if (placeId) {
      slot.placeId = placeId
    }

    return slot
  })
}
