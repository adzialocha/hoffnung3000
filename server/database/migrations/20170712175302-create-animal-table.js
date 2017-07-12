module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('animals', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      resourceType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resourceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('animals')
  },
}
