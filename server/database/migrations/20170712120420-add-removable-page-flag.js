module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
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
    queryInterface.removeColumn('pages', 'isRemovable')
  },
}
