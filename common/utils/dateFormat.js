import { DateTime } from 'luxon'

const DATE_FORMAT = 'ccc dd.MM.yy'
const TIME_FORMAT = 'HH:mm'

export function formatEventTime(from, to) {
  const dateFrom = DateTime.fromISO(from)
  const dateTo = DateTime.fromISO(to)

  const fromDateStr = dateFrom.toFormat(DATE_FORMAT)
  const fromTimeStr = dateFrom.toFormat(TIME_FORMAT)

  let toStr

  if (dateFrom.hasSame(dateTo, 'day')) {
    toStr = dateTo.toFormat(TIME_FORMAT)
  } else {
    const toDateStr = dateTo.toFormat(DATE_FORMAT)
    const toTimeStr = dateTo.toFormat(TIME_FORMAT)

    toStr = `${toDateStr} - ${toTimeStr}`
  }

  return `${fromDateStr} ${fromTimeStr} - ${toStr}`
}
