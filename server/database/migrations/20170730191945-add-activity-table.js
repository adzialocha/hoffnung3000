module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('activities', {
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
      type: {
        type: Sequelize.STRING,
      },
      animalId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      objectType: {
        type: Sequelize.STRING,
      },
      objectId: {
        type: Sequelize.INTEGER,
      },
      objectTitle: {
        type: Sequelize.STRING,
      },
      eventId: {
        type: Sequelize.INTEGER,
      },
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('activities')
  },
}
