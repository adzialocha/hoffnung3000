import db from '../database'

const Slot = db.sequelize.define('slot', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  placeId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: db.Sequelize.INTEGER,
  },
  from: {
    type: db.Sequelize.DATE,
    allowNull: false,
  },
  to: {
    type: db.Sequelize.DATE,
    allowNull: false,
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
