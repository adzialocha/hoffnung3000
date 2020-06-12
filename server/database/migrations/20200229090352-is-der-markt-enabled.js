module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'configs',
      'isDerMarktEnabled',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    )
  },
  down: queryInterface => {
    return queryInterface.removeColumn('isDerMarktEnabled')
  },
}
