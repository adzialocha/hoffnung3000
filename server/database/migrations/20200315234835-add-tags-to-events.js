module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'events',
      'tags',
      {
        type: Sequelize.ARRAY(Sequelize.STRING), /* eslint-disable-line new-cap */
        allowNull: true,
      }
    )
  },
  down: queryInterface => {
    return queryInterface.removeColumn('tags')
  },
}
