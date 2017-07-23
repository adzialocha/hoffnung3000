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
      },
      senderAnimalId: {
        type: Sequelize.INTEGER,
      },
      targetType: {
        type: DataTypes.STRING,
      },
      targetId: {
        type: DataTypes.INTEGER,
        references: null,
      },
      activityType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
  down: (queryInterface) => {
    queryInterface.dropTable('activities')
  },
}
