import Sequelize from 'sequelize'

const config = require('./config.js')[process.env.NODE_ENV]
const { url, dialect } = config
const sequelize = new Sequelize(url, {
  dialect,
})

export default {
  Sequelize,
  sequelize,
}
