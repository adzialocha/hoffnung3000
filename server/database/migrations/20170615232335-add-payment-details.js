module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'paymentMethod',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'users',
        'paymentId',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'users',
        'isActive',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }
      ),
    ])
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('users', 'paymentMethod'),
      queryInterface.removeColumn('users', 'paymentId'),
      queryInterface.removeColumn('users', 'isActive'),
    ])
  },
}
