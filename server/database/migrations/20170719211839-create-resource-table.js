module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('resources', {
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
      animalId: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      slug: {
        type: Sequelize.STRING,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('resources')
  },
}
