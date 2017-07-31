import db from '../database'

const Activity = db.sequelize.define('activity', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: db.Sequelize.STRING,
  },
  animalId: {
    type: db.Sequelize.INTEGER,
  },
  userId: {
    type: db.Sequelize.INTEGER,
  },
  objectType: {
    type: db.Sequelize.STRING,
  },
  objectId: {
    type: db.Sequelize.INTEGER,
  },
  objectTitle: {
    type: db.Sequelize.STRING,
  },
  eventId: {
    type: db.Sequelize.INTEGER,
  },
})

export default Activity
