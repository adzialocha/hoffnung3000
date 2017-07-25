module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('resourcesImages', {
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      resourceName: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      resourceId: {
        primaryKey: true,
        references: null,
        type: Sequelize.INTEGER,
      },
      imageId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('resourcesImages')
  },
}
