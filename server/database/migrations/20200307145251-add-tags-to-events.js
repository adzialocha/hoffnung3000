module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'events',
      'tags',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      }
    )
  },
  down: queryInterface => {
    return queryInterface.removeColumn('tags')
  },
}
