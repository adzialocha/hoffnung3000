import slugify from 'sequelize-slugify'

import db from '../database'

const PerformerEvent = db.sequelize.define('performerEvent', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  performerId: {
    type: db.Sequelize.INTEGER,
  },
  eventId: {
    type: db.Sequelize.INTEGER,
  },
})

export default PerformerEvent
