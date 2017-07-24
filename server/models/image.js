import db from '../database'

const Image = db.sequelize.define('image', {
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
  largeImageUrl: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  mediumImageUrl: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  smallImageUrl: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
})

export default Image
