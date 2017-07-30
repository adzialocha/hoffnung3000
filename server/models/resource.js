import slugify from 'sequelize-slugify'

import db from '../database'

import {
  addCreateActivity,
  addDeleteActivity,
  addUpdateActivity,
} from '../services/activity'

const Resource = db.sequelize.define('resource', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  animalId: {
    type: db.Sequelize.INTEGER,
  },
  title: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  slug: {
    type: db.Sequelize.STRING,
    unique: true,
  },
  description: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    defaultValue: '',
  },
})

slugify.slugifyModel(Resource, {
  source: ['title'],
})

Resource.afterCreate(resource => {
  return addCreateActivity({
    animalId: resource.animalId,
    objectId: resource.id,
    objectTitle: resource.title,
    objectType: 'resource',
  })
})

Resource.afterUpdate(resource => {
  return addUpdateActivity({
    animalId: resource.animalId,
    objectId: resource.id,
    objectTitle: resource.title,
    objectType: 'resource',
  })
})

Resource.afterDestroy(resource => {
  return addDeleteActivity({
    animalId: resource.animalId,
    objectTitle: resource.title,
    objectType: 'resource',
  })
})

export default Resource
