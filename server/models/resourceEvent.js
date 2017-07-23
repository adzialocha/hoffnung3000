import db from '../database'

const ResourceEvent = db.sequelize.define('resourceEvent', {
  createdAt: {
    type: db.Sequelize.DATE,
  },
  updatedAt: {
    type: db.Sequelize.DATE,
  },
  resourceId: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
  },
  eventId: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
  },
})

export default ResourceEvent
