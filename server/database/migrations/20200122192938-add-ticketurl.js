module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'events',
      'ticketUrl',
      {
        type: Sequelize.STRING,
      }
    )
  },
  down: queryInterface => {
    return queryInterface.removeColumn('events', 'ticketUrl')
  },
}
