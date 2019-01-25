module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('pages', [{
      createdAt: new Date,
      isRemovable: false,
      slug: 'home-with-video',
      title: 'Home',
      updatedAt: new Date,
    }])
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('pages', [{
      slug: [
        'home-with-video',
      ],
    }])
  },
}
