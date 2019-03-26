import Sequelize from 'sequelize'

import db from '../database'

const Conversation = db.define('conversation', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  animalId: {
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

export default Conversation
