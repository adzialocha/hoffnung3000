import winston from 'winston'

const DEFAULT_LOG_LEVEL = 'info'

const { format } = winston

export default winston.createLogger({
  level: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(info => {
      return `${info.timestamp} [${info.level}]: ${info.message}`
    })
  ),
  transports: [
    new winston.transports.Console(),
  ],
})
