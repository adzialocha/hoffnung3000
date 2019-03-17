function configField(type, allowNull = false) {
  return {
    type,
    allowNull,
    validate: allowNull ? {} : {
      notEmpty: true,
    },
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('configs', {
      app: configField(Sequelize.STRING),
      baseUrl: configField(Sequelize.STRING),
      currency: configField(Sequelize.STRING),
      defaultCity: configField(Sequelize.STRING),
      defaultCountry: configField(Sequelize.CHAR),
      defaultLatitude: configField(Sequelize.FLOAT),
      defaultLongitude: configField(Sequelize.FLOAT),
      description: configField(Sequelize.STRING),
      festivalDateEnd: configField(Sequelize.DATEONLY),
      festivalDateStart: configField(Sequelize.DATEONLY),
      festivalTicketPrice: configField(Sequelize.FLOAT, true),
      gifStreamServerUrl: configField(Sequelize.STRING, true),
      googleMapApiKey: configField(Sequelize.STRING, true),
      isActivityStreamEnabled: configField(Sequelize.BOOLEAN),
      isAnonymizationEnabled: configField(Sequelize.BOOLEAN),
      isInboxEnabled: configField(Sequelize.BOOLEAN),
      isRandomMeetingEnabled: configField(Sequelize.BOOLEAN),
      isSignUpParticipantEnabled: configField(Sequelize.BOOLEAN),
      isSignUpVisitorEnabled: configField(Sequelize.BOOLEAN),
      mailAddressAdmin: configField(Sequelize.STRING),
      mailAddressRobot: configField(Sequelize.STRING),
      maximumParticipantsCount: configField(Sequelize.INTEGER, true),
      participationPrice: configField(Sequelize.FLOAT, true),
      timezone: configField(Sequelize.STRING),
      title: configField(Sequelize.STRING),
      transferBIC: configField(Sequelize.STRING, true),
      transferBankName: configField(Sequelize.STRING, true),
      transferIBAN: configField(Sequelize.STRING, true),
      transferReceiverName: configField(Sequelize.STRING, true),
      videoHomeId: configField(Sequelize.STRING, true),
      videoIntroductionId: configField(Sequelize.STRING, true),
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('configs')
  },
}
