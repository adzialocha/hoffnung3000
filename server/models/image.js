import db from '../database'
import { createAndUploadImageVersions } from '../services/imageVersions'
import { deleteObjects } from '../services/s3'

const Image = db.sequelize.define('image', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fileName: {
    type: db.Sequelize.STRING,
    allowNull: false,
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

Image.hook('beforeValidate', image => {
  if (!image.fileName) {
    return Promise.reject(
      new Error('Invalid image object')
    )
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

Image.hook('beforeDestroy', image => {
  return deleteObjects([
    image.largeImageUrl,
    image.mediumImageUrl,
    image.smallImageUrl,
  ])
})

export default Image
