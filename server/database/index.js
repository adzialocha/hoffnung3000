import Sequelize from 'sequelize'

import config from './config'
import logger from '../helpers/logger'

const { url, dialect } = config[process.env.NODE_ENV]

export default new Sequelize(url, {
  dialect,
  logging: msg => {
    logger.debug(msg)
  },
})
