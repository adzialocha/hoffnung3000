import Sequelize from 'sequelize'

import logger from '../helpers/logger'
import config from './config'

const DEFAULT_LOG_LEVEL = 'info'

const { url, dialect } = config[process.env.NODE_ENV]

const sequelize = new Sequelize(url, {
  level: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
  logging: msg => {
    logger.debug(msg)
  },
  dialect,
  operatorsAliases: false,
})

export default {
  Sequelize,
  sequelize,
}
