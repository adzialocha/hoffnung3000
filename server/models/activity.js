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
  receiverAnimalId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  senderAnimalId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  resourceName: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  resourceId: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  imageId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
})

export const ActivityBelongsToReceiverAnimal = Activity.belongsTo(Animal, {
  as: 'receiverAnimal',
  foreignKey: 'receiverAnimalId',
})

export const ActivityBelongsToSenderAnimal = Activity.belongsTo(Animal, {
  as: 'senderAnimal',
  foreignKey: 'senderAnimalId',
})

export default Activity
