import db from '../database'

const Slot = db.sequelize.define('slot', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: db.Sequelize.DATE,
  },
  updatedAt: {
    type: db.Sequelize.DATE,
  },
  placeId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: db.Sequelize.INTEGER,
  },
  slotIndex: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  isDisabled: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
})

export default Slot
