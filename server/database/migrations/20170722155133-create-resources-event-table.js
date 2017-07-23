module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('resourcesEvents', {
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
      resourceId: {
        type: Sequelize.INTEGER,
      },
      eventId: {
        type: Sequelize.INTEGER,
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('resourcesEvents')
  },
}
