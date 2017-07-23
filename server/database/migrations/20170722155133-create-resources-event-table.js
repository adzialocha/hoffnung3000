module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('resourcesEvents', {
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      resourceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      eventId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('resourcesEvents')
  },
}
