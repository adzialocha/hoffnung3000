import Sequelize from 'sequelize'

import db from '../database'

const ResourceEvent = db.define('resourceEvent', {
  resourceId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  eventId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
})

export default ResourceEvent
