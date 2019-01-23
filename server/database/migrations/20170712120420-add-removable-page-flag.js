module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'pages',
      'isRemovable',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    )
  },
  down: queryInterface => {
    return queryInterface.removeColumn('pages', 'isRemovable')
  },
}
