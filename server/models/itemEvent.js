import db from '../database'

const ItemEvent = db.sequelize.define('itemEvent', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  itemId: {
    type: db.Sequelize.INTEGER,
  },
  eventId: {
    type: db.Sequelize.INTEGER,
  },
})

export default ItemEvent
