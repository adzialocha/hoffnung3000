import db from '../database'

import Animal from './animal'
import Message from './message'

const Conversation = db.sequelize.define('conversation', {
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
  title: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
})

export const ConversationBelongsToManyAnimal = Conversation.belongsToMany(
  Animal, {
    as: 'animals',
    foreignKey: 'conversationId',
    through: 'conversationsAnimals',
  }
)

export const ConversationBelongsToManyMessage = Conversation.belongsToMany(
  Message, {
    as: 'messages',
    foreignKey: 'conversationId',
  }
)

export default Conversation
