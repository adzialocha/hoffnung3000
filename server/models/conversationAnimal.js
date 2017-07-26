import db from '../database'

const ConversationAnimal = db.sequelize.define('conversationAnimal', {
  createdAt: {
    type: db.Sequelize.DATE,
  },
  updatedAt: {
    type: db.Sequelize.DATE,
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
