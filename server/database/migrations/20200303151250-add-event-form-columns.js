module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'events',
        'socialMedia',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'events',
        'ticketUrl',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'events',
        'websiteUrl',
        {
          type: Sequelize.STRING,
        }
      ),
    ])
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('events', 'socialMedia'),
      queryInterface.removeColumn('events', 'ticketUrl'),
      queryInterface.removeColumn('events', 'websiteUrl'),
    ])
  },
}
