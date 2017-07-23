import Sequelize from 'sequelize'
import winston from 'winston'

const config = require('./config.js')[process.env.NODE_ENV]
const { url, dialect } = config
const sequelize = new Sequelize(url, {
  logging: (msg) => {
    winston.info(msg)
  },
  dialect,
})

export default {
  Sequelize,
  sequelize,
}
