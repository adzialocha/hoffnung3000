module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'isAdmin',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }
      ),
      queryInterface.addColumn(
        'users',
        'isParticipant',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }
      ),
    ])
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('users', 'isAdmin'),
      queryInterface.removeColumn('users', 'isParticipant'),
    ])
  },
}
