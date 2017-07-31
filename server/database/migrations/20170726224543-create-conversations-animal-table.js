module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conversationsAnimals', {
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      lastCheckedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      conversationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      animalId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('conversationsAnimals')
  },
}
