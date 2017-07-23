import dateFns from 'date-fns'

import config from '../../config'

export function getSlotTimes(slotSize, slotIndex) {
  const date = config.festivalDateStart
  return {
    from: dateFns.addMinutes(date, slotSize * slotIndex),
    to: dateFns.addMinutes(date, slotSize * (slotIndex + 1)),
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
