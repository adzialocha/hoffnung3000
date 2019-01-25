import Sequelize from 'sequelize'
import generateRandomAnimalName from 'random-animal-name-generator'

import db from '../database'

const Animal = db.define('animal', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

Animal.beforeValidate(animal => {
  animal.name = generateRandomAnimalName()
})

export default Animal
