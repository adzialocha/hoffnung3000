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
  timezone: configField(Sequelize.STRING),
  currency: configField(Sequelize.STRING),
  title: configField(Sequelize.STRING),
  description: configField(Sequelize.STRING),
  baseUrl: configField(Sequelize.STRING),
  mailAddressAdmin: configField(Sequelize.STRING),
  mailAddressRobot: configField(Sequelize.STRING),
  maximumParticipantsCount: configField(Sequelize.INTEGER, true),
  festivalTicketPrice: configField(Sequelize.FLOAT, true),
  participationPrice: configField(Sequelize.FLOAT, true),
  defaultCity: configField(Sequelize.STRING),
  defaultCounty: configField(Sequelize.CHAR),
  defaultLatitude: configField(Sequelize.FLOAT),
  defaultLongitude: configField(Sequelize.FLOAT),
})

export default Config
