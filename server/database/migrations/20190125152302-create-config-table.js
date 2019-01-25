function configField(type, allowNull = false) {
  return {
    type,
    allowNull,
    validate: {
      notEmpty: true,
    },
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('configs', {
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
  },
  down: queryInterface => {
    return queryInterface.dropTable('configs')
  },
}
