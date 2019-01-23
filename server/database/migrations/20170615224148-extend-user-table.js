module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'street',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
        }
      ),
      queryInterface.addColumn(
        'users',
        'cityCode',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
        }
      ),
      queryInterface.addColumn(
        'users',
        'city',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
        }
      ),
      queryInterface.addColumn(
        'users',
        'country',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
        }
      ),
    ])
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('users', 'street'),
      queryInterface.removeColumn('users', 'cityCode'),
      queryInterface.removeColumn('users', 'city'),
      queryInterface.removeColumn('users', 'country'),
    ])
  },
}
