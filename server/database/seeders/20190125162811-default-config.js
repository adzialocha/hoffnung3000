module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('configs', [{
      timezone: 'Europe/Berlin',
      currency: 'EUR',
      title: 'HOFFNUNG 3000',
      description: 'HOFFNUNG 3000 is a festival',
      baseUrl: 'https://domain.com',
      mailAddressAdmin: 'admin@domain.com',
      mailAddressRobot: 'noreply@domain.com',
      maximumParticipantsCount: 30,
      festivalTicketPrice: 10.00,
      participationPrice: 25.00,
      defaultCity: 'Berlin',
      defaultCounty: 'Germany',
      defaultLatitude: 52.53647,
      festivalDateEnd: '2017-08-27',
      festivalDateStart: '2017-08-24',
      defaultLongitude: 13.40780,
    }])
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('configs', [])
  },
}
