module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('pages', [
      {
        createdAt: new Date,
        updatedAt: new Date,
        title: 'Information',
        slug: 'information',
        content: 'Information',
        isRemovable: false,
      },
      {
        createdAt: new Date,
        updatedAt: new Date,
        title: 'Home',
        slug: 'home',
        content: 'Home',
        isRemovable: false,
      },
      {
        createdAt: new Date,
        updatedAt: new Date,
        title: 'Contact',
        slug: 'contact',
        content: 'Contact',
        isRemovable: false,
      },
      {
        createdAt: new Date,
        updatedAt: new Date,
        title: 'Imprint',
        slug: 'imprint',
        content: 'Imprint',
        isRemovable: false,
      },
      {
        createdAt: new Date,
        updatedAt: new Date,
        title: 'About',
        slug: 'about',
        content: 'About',
        isRemovable: false,
      },
      {
        createdAt: new Date,
        updatedAt: new Date,
        title: 'Registration',
        slug: 'waitinglist',
        content: 'Waiting list',
        isRemovable: false,
      },
    ], {})
  },
  down: (queryInterface) => {
    queryInterface.bulkDelete('pages', null, {})
  },
}
