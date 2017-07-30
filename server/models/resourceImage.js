import db from '../database'

const ResourceImage = db.sequelize.define('resourcesImages', {
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
