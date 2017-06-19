import Sequelize from 'sequelize'

const config = require('./config.js')[process.env.NODE_ENV]
const { url, dialect } = config
const sequelize = new Sequelize(url, {
  logging: process.env.NODE_ENV === 'development',
  dialect,
})

export default {
  Sequelize,
  sequelize,
}
