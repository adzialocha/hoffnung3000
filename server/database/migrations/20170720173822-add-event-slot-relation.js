module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'slots',
      'eventId',
      {
        type: Sequelize.INTEGER,
      }
    )
  },
  down: queryInterface => {
    queryInterface.removeColumn('slots', 'eventId')
  },
}
