import db from '../database'

import Animal from './animal'
import Conversation from './conversation'

const Message = db.sequelize.define('message', {
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
  animalId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  conversationId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  text: {
    type: db.Sequelize.TEXT,
    allowNull: false,
  },
})

export const MessageBelongsToAnimal = Message.belongsTo(Animal, {
  as: 'animal',
  foreignKey: 'animalId',
})

export const MessageBelongsToConversation = Message.belongsTo(Conversation, {
  as: 'conversation',
  foreignKey: 'conversationId',
})

export default Message
