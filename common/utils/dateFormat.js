import dateFns from 'date-fns'

const DATE_FORMAT = 'ddd DD.MM.YY'
const TIME_FORMAT = 'HH:mm'

export function formatEventTime(from, to) {
  const fromDateStr = dateFns.format(from, DATE_FORMAT)
  const fromTimeStr = dateFns.format(from, TIME_FORMAT)

  let toStr

  if (dateFns.isSameDay(from, to)) {
    toStr = dateFns.format(to, TIME_FORMAT)
  } else {
    const toDateStr = dateFns.format(to, DATE_FORMAT)
    const toTimeStr = dateFns.format(to, TIME_FORMAT)
    toStr = `${toDateStr} - ${toTimeStr}`
  }

  return `${fromDateStr} ${fromTimeStr} - ${toStr}`
}
