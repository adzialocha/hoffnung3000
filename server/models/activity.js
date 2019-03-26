import Sequelize from 'sequelize'

import db from '../database'

const Activity = db.define('activity', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: Sequelize.STRING,
  },
  animalId: {
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  objectType: {
    type: Sequelize.STRING,
  },
  objectId: {
    type: Sequelize.INTEGER,
  },
  objectTitle: {
    type: Sequelize.STRING,
  },
  eventId: {
    type: Sequelize.INTEGER,
  },
})

export default Activity
