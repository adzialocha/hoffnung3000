module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'slots',
      'from',
      {
        type: Sequelize.DATE,
        allowNull: false,
      }
    )

    queryInterface.addColumn(
      'slots',
      'to',
      {
        type: Sequelize.DATE,
        allowNull: false,
      }
    )
  },
  down: (queryInterface) => {
    queryInterface.removeColumn('slots', 'from')
    queryInterface.removeColumn('slots', 'to')
  },
}
