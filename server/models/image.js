import Sequelize from 'sequelize'

import db from '../database'
import { createAndUploadImageVersions } from '../services/imageVersions'
import { deleteImages } from '../services/upload'

const Image = db.define('image', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fileName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  largeImageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mediumImageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  smallImageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

Image.addHook('beforeValidate', image => {
  if (!image.fileName) {
    return Promise.reject(new Error('Invalid image object'))
  }

  return new Promise((resolve, reject) => {
    createAndUploadImageVersions(image.fileName)
      .then(result => {
        image.largeImageUrl = result.largeImageUrl
        image.mediumImageUrl = result.mediumImageUrl
        image.smallImageUrl = result.smallImageUrl

        resolve()
      })
      .catch(err => reject(err))
  })
})

Image.addHook('beforeDestroy', image => {
  return deleteImages([
    image.largeImageUrl,
    image.mediumImageUrl,
    image.smallImageUrl,
  ])
})

export default Image
