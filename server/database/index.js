import Sequelize from 'sequelize'

import logger from '../helpers/logger'
import config from './config'

const { url, dialect } = config[process.env.NODE_ENV]

export default new Sequelize(url, {
  logging: msg => {
    logger.debug(msg)
  },
  dialect,
  operatorsAliases: false, // @TODO Remove this option in sequelize@>=5.0
})
