module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('configs', [{
      app: 'default',
      baseUrl: 'https://domain.com',
      currency: 'EUR',
      defaultCity: 'Berlin',
      defaultCountry: 'Germany',
      defaultLatitude: 52.53647,
      defaultLongitude: 13.40780,
      description: 'HOFFNUNG 3000 is a festival',
      festivalDateEnd: '2017-08-27',
      festivalDateStart: '2017-08-24',
      festivalTicketPrice: 10.00,
      gifStreamServerUrl: '',
      googleMapApiKey: '',
      isActivityStreamEnabled: true,
      isInboxEnabled: true,
      isRandomMeetingEnabled: true,
      isSignUpParticipantEnabled: true,
      isSignUpVisitorEnabled: true,
      mailAddressAdmin: 'admin@domain.com',
      mailAddressRobot: 'noreply@domain.com',
      maximumParticipantsCount: 30,
      participationPrice: 25.00,
      timezone: 'Europe/Berlin',
      title: 'HOFFNUNG 3000',
      transferBIC: '',
      transferBankName: '',
      transferIBAN: '',
      transferReceiverName: '',
      videoHomeId: '',
      videoIntroductionId: '',
    }])
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('configs', [])
  },
}
