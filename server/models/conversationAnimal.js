import db from '../database'

const ConversationAnimal = db.sequelize.define('conversationsAnimals', {
  lastCheckedAt: {
    type: db.Sequelize.DATE,
    allowNull: true,
  },
  conversationId: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
  },
  animalId: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
  },
})

export default ConversationAnimal
