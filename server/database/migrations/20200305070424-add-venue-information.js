module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'places',
        'accessibilityInfo',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'places',
        'capacity',
        {
          type: Sequelize.STRING,
        }
      ),
    ])
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('places', 'accessibilityInfo'),
      queryInterface.removeColumn('places', 'capacity'),
    ])
  },
}
