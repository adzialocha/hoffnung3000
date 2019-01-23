module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'isAdmin',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    )

    queryInterface.addColumn(
      'users',
      'isParticipant',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    )
  },
  down: queryInterface => {
    queryInterface.removeColumn('users', 'isAdmin')
    queryInterface.removeColumn('users', 'isParticipant')
  },
}
