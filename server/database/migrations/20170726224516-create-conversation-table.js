module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conversations', {
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
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('conversations')
  },
}
