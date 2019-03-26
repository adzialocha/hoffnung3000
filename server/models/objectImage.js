import Sequelize from 'sequelize'

import db from '../database'

const ObjectImage = db.define('objectsImages', {
  objectType: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  objectId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  imageId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
})

export default ObjectImage
