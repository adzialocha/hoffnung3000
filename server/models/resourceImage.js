import db from '../database'

const ResourceImage = db.sequelize.define('resourcesImages', {
  createdAt: {
    type: db.Sequelize.DATE,
  },
  updatedAt: {
    type: db.Sequelize.DATE,
  },
  resourceName: {
    type: db.Sequelize.STRING,
    primaryKey: true,
  },
  resourceId: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
  },
  imageId: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
  },
})

export default ResourceImage
