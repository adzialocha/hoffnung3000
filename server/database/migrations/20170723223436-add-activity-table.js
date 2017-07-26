module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('activities', {
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
      receiverAnimalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      senderAnimalId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resourceName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resourceId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
    })
  },
  down: (queryInterface) => {
    queryInterface.dropTable('activities')
  },
}
