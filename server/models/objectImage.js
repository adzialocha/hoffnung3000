import db from '../database'

const ObjectImage = db.sequelize.define('objectsImages', {
  objectType: {
    type: db.Sequelize.STRING,
    primaryKey: true,
  },
  objectId: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
  },
  imageId: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
  },
})

export default ObjectImage
