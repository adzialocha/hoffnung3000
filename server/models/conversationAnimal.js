import Sequelize from 'sequelize'

import db from '../database'

const ConversationAnimal = db.define('conversationsAnimals', {
  lastCheckedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  conversationId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  animalId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
})

export default ConversationAnimal
