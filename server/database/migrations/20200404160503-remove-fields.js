
module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('users', 'street'),
      queryInterface.removeColumn('users', 'cityCode'),
      queryInterface.removeColumn('users', 'city'),
      queryInterface.removeColumn('users', 'country'),
    ])
  },
  down: () => {
    // Do nothing here ..
  },
}