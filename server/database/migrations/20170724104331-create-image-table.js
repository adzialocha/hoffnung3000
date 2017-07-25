module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('images', {
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
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      largeImageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mediumImageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      smallImageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('images')
  },
}
