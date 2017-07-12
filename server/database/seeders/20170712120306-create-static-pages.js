function makePage(title, slug) {
  return {
    createdAt: new Date,
    isRemovable: false,
    slug,
    title,
    updatedAt: new Date,
  }
}

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('pages', [
      makePage('About', 'about'),
      makePage('Contact', 'contact'),
      makePage('Home', 'home'),
      makePage('Imprint', 'imprint'),
      makePage('Information', 'information'),
      makePage('Registration', 'registration-full'),
      makePage('Registration', 'registration-intro'),
      makePage('Registration', 'registration-payment'),
      makePage('Ticket', 'ticket-intro'),
      makePage('Ticket', 'ticket-payment'),
    ])
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('pages', [{
      slug: [
        'about',
        'contact',
        'home',
        'imprint',
        'information',
        'registration-full',
        'registration-intro',
        'registration-payment',
        'ticket-intro',
        'ticket-payment',
      ],
    }])
  },
}
