import Sequelize from 'sequelize'

import db from '../database'

const Slot = db.define('slot', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  placeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: Sequelize.INTEGER,
  },
  from: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  to: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  slotIndex: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isDisabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
})

export default Slot
