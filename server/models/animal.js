import generateRandomAnimalName from 'random-animal-name-generator'

import db from '../database'

import Place from './place'
import User from './user'

const Animal = db.sequelize.define('animal', {
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
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  resourceType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  resourceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

Animal.hook('beforeCreate', (animal) => {
  animal.name = generateRandomAnimalName()
})

Animal.belongsTo(User)

Animal.belongsTo(Place, {
  as: 'place',
  constraints: false,
  foreignKey: 'resourceId',
})

export default Animal
