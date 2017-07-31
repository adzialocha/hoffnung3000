import db from '../database'

const ResourceEvent = db.sequelize.define('resourceEvent', {
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
