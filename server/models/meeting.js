import Sequelize from 'sequelize'

import db from '../database'

const Meeting = db.define('meeting', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  placeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  from: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  to: {
    type: Sequelize.DATE,
    allowNull: false,
  },
})

export default Meeting
