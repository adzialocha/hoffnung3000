module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'configs',
      'defaultZoom',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 13,
      }
    )
  },
  down: queryInterface => {
    return queryInterface.removeColumn('configs', 'defaultZoom')
  },
}
