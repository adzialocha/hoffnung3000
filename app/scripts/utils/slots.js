import dateFns from 'date-fns'

import { translate } from '../services/i18n'

const FESTIVAL_DATE_START = '2017-08-24T00:00:00.000+02:00'
const FESTIVAL_DATE_END = '2017-08-27T00:00:00.000+02:00'
const TIME_FORMAT = 'HH:mm'

function convertSlotSize(slotSizeStr) {
  const slotSize = slotSizeStr.split(':').map(val => parseInt(val, 10))
  return {
    hours: slotSize[0],
    minutes: slotSize[1],
  }
}

function addSlotDuration(date, slotSizeObj) {
  const { hours, minutes } = slotSizeObj
  return dateFns.addMinutes(dateFns.addHours(date, hours), minutes)
}

function isInFestivalRange(date) {
  return dateFns.isWithinRange(
    date,
    FESTIVAL_DATE_START,
    FESTIVAL_DATE_END
  )
}

export function checkSlotSize(slotSizeStr) {
  let errorMessage

  if (!slotSizeStr || slotSizeStr.length === 0) {
    errorMessage = translate('forms.place.errors.slotSizeRequired')
  }

  if (!(/^\d\d:\d\d$/i.test(slotSizeStr))) {
    errorMessage = translate('forms.place.errors.slotSizeWrongFormat')
  }

  const { hours, minutes } = convertSlotSize(slotSizeStr)

  if (minutes > 59) {
    errorMessage = translate('forms.place.errors.slotSizeWrongFormat')
  } else if ((hours === 24 && minutes > 0) || (hours > 24 && minutes === 0)) {
    errorMessage = translate('forms.place.errors.slotSizeMaximum')
  } else if (hours === 0 && minutes < 1) {
    errorMessage = translate('forms.place.errors.slotSizeMinimum')
  }

  return {
    errorMessage,
    isValid: (errorMessage === undefined),
  }
}

function stringPad(num) {
  return num < 10 ? `0${num}` : num
}

export function numberToSlotSizeStr(num) {
  const hours = Math.floor(num / 60)
  const minutes = num - (hours * 60)

  return `${stringPad(hours)}:${stringPad(minutes)}`
}

export function prepareSlotIds(slots) {
  return slots.reduce((acc, slot) => {
    if (slot.status !== undefined) {
      acc.push(slot.id)
    }
    return acc
  }, [])
}

export function generateNewSlotItems(slotSizeStr, existingSlots) {
  const slotItems = []

  if (!checkSlotSize(slotSizeStr).isValid) {
    return slotItems
  }

  let existingSlotStates = {}

  if (existingSlots) {
    existingSlotStates = existingSlots.reduce((acc, slot) => {
      if (slot.isDisabled) {
        acc[slot.slotIndex] = 'disabled'
      }
      return acc
    }, {})
  }

  const slotSizeObj = convertSlotSize(slotSizeStr)

  let id = 0
  let from = dateFns.parse(FESTIVAL_DATE_START)
  let to = addSlotDuration(from, slotSizeObj)

  while (isInFestivalRange(to)) {
    slotItems.push({
      from,
      fromTimeStr: dateFns.format(from, TIME_FORMAT),
      id,
      to,
      status: existingSlotStates[id],
      toTimeStr: dateFns.format(to, TIME_FORMAT),
    })

    id += 1
    from = addSlotDuration(from, slotSizeObj)
    to = addSlotDuration(from, slotSizeObj)
  }

  return slotItems
}
