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
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('configs')
  },
}
