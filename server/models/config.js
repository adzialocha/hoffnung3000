import Sequelize from 'sequelize'

import db from '../database'

// Helper method to define model fields with default values
function configField(type, allowNull = false) {
  return {
    type,
    allowNull,
    validate: {
      notEmpty: true,
    },
  }
}

// This model holds global configurations which are crucial for
// the whole application. Defaults are defined in a database seed.
const Config = db.define('config', {
  baseUrl: configField(Sequelize.STRING),
  currency: configField(Sequelize.STRING),
  defaultCity: configField(Sequelize.STRING),
  defaultCounty: configField(Sequelize.CHAR),
  defaultLatitude: configField(Sequelize.FLOAT),
  defaultLongitude: configField(Sequelize.FLOAT),
  description: configField(Sequelize.STRING),
  festivalDateEnd: configField(Sequelize.DATEONLY),
  festivalDateStart: configField(Sequelize.DATEONLY),
  festivalTicketPrice: configField(Sequelize.FLOAT, true),
  mailAddressAdmin: configField(Sequelize.STRING),
  mailAddressRobot: configField(Sequelize.STRING),
  maximumParticipantsCount: configField(Sequelize.INTEGER, true),
  participationPrice: configField(Sequelize.FLOAT, true),
  timezone: configField(Sequelize.STRING),
  title: configField(Sequelize.STRING),
}, {
  timestamps: false,
})

Config.removeAttribute('id')

export default Config
