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
  animalId: {
    type: db.Sequelize.INTEGER,
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
    attributes: [
      'lastCheckedAt',
    ],
  }
)

export const AnimalBelongsToManyConversation = Animal.belongsToMany(
  Conversation, {
    as: 'conversations',
    foreignKey: 'animalId',
    through: 'conversationsAnimals',
    attributes: [
      'lastCheckedAt',
    ],
  }
)

export const ConversationBelongsToAnimal = Conversation.belongsTo(Animal, {
  as: 'animal',
  foreignKey: 'animalId',
  onDelete: 'CASCADE',
})

export const ConversationHasManyMessage = Conversation.hasMany(Message, {
  as: 'messages',
  foreignKey: 'conversationId',
})

export const MessageBelongsToConversation = Message.belongsTo(Conversation, {
  as: 'conversation',
  foreignKey: 'conversationId',
})

export default Conversation
