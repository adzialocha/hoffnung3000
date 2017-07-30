import db from '../database'

const Message = db.sequelize.define('message', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

export default Message
