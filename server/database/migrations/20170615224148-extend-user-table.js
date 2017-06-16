module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'street',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      }
    )

    queryInterface.addColumn(
      'users',
      'cityCode',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      }
    )

    queryInterface.addColumn(
      'users',
      'city',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      }
    )

    queryInterface.addColumn(
      'users',
      'country',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      }
    )
  },
  down: (queryInterface) => {
    queryInterface.removeColumn('users', 'street')
    queryInterface.removeColumn('users', 'cityCode')
    queryInterface.removeColumn('users', 'city')
    queryInterface.removeColumn('users', 'country')
  },
}
