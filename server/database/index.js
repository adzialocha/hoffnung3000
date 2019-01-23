import Sequelize from 'sequelize'

import logger from '../helpers/logger'

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: msg => {
    if (process.env.NODE_ENV !== 'production') {
      logger.info(msg)
    }
  },
  dialect: process.env.DATABASE_DIALECT,
  operatorsAliases: false,
})

export {
  Sequelize,
  sequelize,
}
