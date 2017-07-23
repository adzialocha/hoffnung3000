import db from '../database'

const Activity = db.sequelize.define('activity', {
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
  animalId: {
    type: Sequelize.INTEGER,
  },
  targetType: {
    type: DataTypes.STRING,
  },
  targetId: {
    type: DataTypes.INTEGER,
    references: null,
  },
  activityType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

export default Activity
