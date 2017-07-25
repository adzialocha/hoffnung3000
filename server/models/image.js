import db from '../database'
import { deleteObjects } from '../services/s3'

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

Image.hook('beforeCreate', (image) => {
  return deleteObjects([
    image.largeImageUrl,
    image.mediumImageUrl,
    image.smallImageUrl,
  ])
})

Image.hook('beforeDestroy', (image) => {
  return deleteObjects([
    image.largeImageUrl,
    image.mediumImageUrl,
    image.smallImageUrl,
  ])
})

export default Image
