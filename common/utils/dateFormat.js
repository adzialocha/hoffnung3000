import { DateTime } from 'luxon'

const DATE_FORMAT = 'ddd DD.MM.YY'
const TIME_FORMAT = 'HH:mm'

export function formatEventTime(from, to) {
  const fromDateStr = DateTime.fromISO(from).toFormat(DATE_FORMAT)
  const fromTimeStr = DateTime.fromISO(from).toFormat(TIME_FORMAT)

  let toStr

  if (DateTime.fromISO(from).hasSame(to, 'day')) {
    toStr = DateTime.fromISO(to).toFormat(TIME_FORMAT)
  } else {
    const toDateStr = DateTime.fromISO(to).toFormat(DATE_FORMAT)
    const toTimeStr = DateTime.fromISO(to).toFormat(TIME_FORMAT)
    toStr = `${toDateStr} - ${toTimeStr}`
  }

  return `${fromDateStr} ${fromTimeStr} - ${toStr}`
}
