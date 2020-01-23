module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'configs',
      'isFestivalFree',
      {
        type: Sequelize.BOOLEAN,
      }
    )
  },
  down: queryInterface => {
    return queryInterface.removeColumn('configs', 'isFestivalFree')
  },
}
