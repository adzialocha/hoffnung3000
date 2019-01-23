module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'slots',
        'from',
        {
          type: Sequelize.DATE,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'slots',
        'to',
        {
          type: Sequelize.DATE,
          allowNull: false,
        }
      ),
    ])
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('slots', 'from'),
      queryInterface.removeColumn('slots', 'to'),
    ])
  },
}
