import Sequelize from 'sequelize'

import db from '../database'

const Message = db.define('message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  animalId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

export default Message
