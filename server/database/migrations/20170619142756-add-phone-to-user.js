module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'phone',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      }
    )
  },
  down: queryInterface => {
    queryInterface.removeColumn('users', 'phone')
  },
}
