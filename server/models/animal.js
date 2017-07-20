import generateRandomAnimalName from 'random-animal-name-generator'

import db from '../database'

const Animal = db.sequelize.define('animal', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: db.Sequelize.DATE,
  },
  updatedAt: {
    type: db.Sequelize.DATE,
  },
  userId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
})

Animal.beforeValidate(animal => {
  animal.name = generateRandomAnimalName()
})

export default Animal
