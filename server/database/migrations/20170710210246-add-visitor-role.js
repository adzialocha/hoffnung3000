module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'isVisitor',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    )
  },
  down: queryInterface => {
    queryInterface.removeColumn('users', 'isVisitor')
  },
}
