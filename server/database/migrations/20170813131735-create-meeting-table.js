module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meetings', {
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
      placeId: {
        type: Sequelize.INTEGER,
      },
      conversationId: {
        type: Sequelize.INTEGER,
      },
      from: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      to: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('meetings')
  },
}
