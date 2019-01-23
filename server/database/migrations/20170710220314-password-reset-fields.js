module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'passwordResetAt',
        {
          type: Sequelize.DATE,
        }
      ),
      queryInterface.addColumn(
        'users',
        'passwordResetToken',
        {
          type: Sequelize.STRING,
        }
      ),
    ])
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('users', 'passwordResetAt'),
      queryInterface.removeColumn('users', 'passwordResetToken'),
    ])
  },
}
