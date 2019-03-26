module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'slots',
      'eventId',
      {
        type: Sequelize.INTEGER,
      }
    )
  },
  down: queryInterface => {
    return queryInterface.removeColumn('slots', 'eventId')
  },
}
