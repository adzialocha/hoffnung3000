import Sequelize from 'sequelize'
import slugify from 'sequelize-slugify'

import db from '../database'

import {
  addCreateActivity,
  addDeleteActivity,
  addUpdateActivity,
} from '../services/activity'

const Resource = db.define('resource', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  animalId: {
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  slug: {
    type: Sequelize.STRING,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT,
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
