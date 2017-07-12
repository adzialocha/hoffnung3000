module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('places', {
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
        allowNull: false,
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
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      isPrivate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      slotSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      cityCode: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('places')
  },
}
