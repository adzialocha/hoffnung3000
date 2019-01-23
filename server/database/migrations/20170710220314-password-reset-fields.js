module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'passwordResetAt',
      {
        type: Sequelize.DATE,
      }
    )

    queryInterface.addColumn(
      'users',
      'passwordResetToken',
      {
        type: Sequelize.STRING,
      }
    )
  },
  down: queryInterface => {
    queryInterface.removeColumn('users', 'passwordResetAt')
    queryInterface.removeColumn('users', 'passwordResetToken')
  },
}
