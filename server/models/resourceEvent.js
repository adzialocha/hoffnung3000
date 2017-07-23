import db from '../database'

const ResourceEvent = db.sequelize.define('resourceEvent', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  resourceId: {
    type: db.Sequelize.INTEGER,
  },
  eventId: {
    type: db.Sequelize.INTEGER,
  },
})

export default ResourceEvent
