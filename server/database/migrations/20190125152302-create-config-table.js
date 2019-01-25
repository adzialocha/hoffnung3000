function configField(type, defaultValue, allowNull = false) {
  return {
    type,
    defaultValue,
    allowNull,
    validate: {
      notEmpty: true,
    },
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('config', {
      timezone: configField(Sequelize.CHAR, 'Europe/Berlin'),
      currency: configField(Sequelize.CHAR, 'EUR'),
      title: configField(Sequelize.CHAR, 'HOFFNUNG 3000'),
      description: configField(Sequelize.STRING, 'HOFFNUNG 3000 is a festival'),
      basePath: configField(Sequelize.CHAR, 'https://domain.com'),
      mailAddressAdmin: configField(Sequelize.CHAR, 'admin@domain.com'),
      mailAddressRobot: configField(Sequelize.CHAR, 'noreply@domain.com'),
      maximumParticipantsCount: configField(Sequelize.INTEGER, 30, true),
      festivalTicketPrice: configField(Sequelize.FLOAT, 10.00, true),
      participationPrice: configField(Sequelize.FLOAT, 25.00, true),
      defaultCity: configField(Sequelize.CHAR, 'Berlin'),
      defaultCounty: configField(Sequelize.CHAR, 'Germany'),
      defaultLatitude: configField(Sequelize.FLOAT, 52.53647),
      defaultLongitude: configField(Sequelize.FLOAT, 13.40780),
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('config')
  },
}
