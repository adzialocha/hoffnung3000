import db from '../database'

const Meeting = db.sequelize.define('meeting', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  placeId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  conversationId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  from: {
    type: db.Sequelize.DATE,
    allowNull: false,
  },
  to: {
    type: db.Sequelize.DATE,
    allowNull: false,
  },
})

export default Meeting
