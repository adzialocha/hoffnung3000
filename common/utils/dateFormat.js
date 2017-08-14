import moment from 'moment-timezone'

const DATE_FORMAT = 'ddd DD.MM.YY'
const TIME_FORMAT = 'HH:mm'

export function formatEventTime(from, to) {
  const fromDateStr = moment(from).format(DATE_FORMAT)
  const fromTimeStr = moment(from).format(TIME_FORMAT)

  let toStr

  if (moment(from).isSame(to, 'day')) {
    toStr = moment(to).format(TIME_FORMAT)
  } else {
    const toDateStr = moment(to).format(DATE_FORMAT)
    const toTimeStr = moment(to).format(TIME_FORMAT)
    toStr = `${toDateStr} - ${toTimeStr}`
  }

  return `${fromDateStr} ${fromTimeStr} - ${toStr}`
}
