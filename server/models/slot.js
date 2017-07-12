import db from '../database'

import Place from './place'

const Slot = db.sequelize.define('slot', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
  placeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isDisabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  from: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  to: {
    type: Sequelize.DATE,
    allowNull: false,
  },
})

Slot.belongsTo(Place)

export default Slot
