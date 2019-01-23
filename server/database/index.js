import Sequelize from 'sequelize'

import logger from '../helpers/logger'
import config from './config'

const { url, dialect } = config[process.env.NODE_ENV]

const sequelize = new Sequelize(url, {
  logging: msg => {
    if (process.env.NODE_ENV !== 'production') {
      logger.debug(msg)
    }
  },
  dialect,
  operatorsAliases: false,
})

export default {
  Sequelize,
  sequelize,
}
