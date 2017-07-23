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
      makePage('Calendar (public)', 'calendar-public'),
      makePage('Calendar', 'calendar'),
      makePage('Places', 'places'),
      makePage('Markt', 'resources'),
      makePage('New Event', 'new-event'),
    ])
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('pages', [{
      slug: [
        'calendar-public',
        'calendar',
        'places',
        'resources',
        'new-event',
      ],
    }])
  },
}
