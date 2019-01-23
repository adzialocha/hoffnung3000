import winston from 'winston'

const { format } = winston

export default winston.createLogger({
  format: format.combine(
    format.colorize(),
    format.splat(),
    format.simple()
  ),
  transports: [
    new winston.transports.Console(),
  ],
})
