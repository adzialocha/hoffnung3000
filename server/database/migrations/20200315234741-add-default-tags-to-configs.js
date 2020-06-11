module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'configs',
      'defaultTags',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      }
    )
  },
  down: queryInterface => {
    return queryInterface.removeColumn('defaultTags')
  },
}
