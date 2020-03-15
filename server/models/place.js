import Sequelize from 'sequelize'
import slugify from 'sequelize-slugify'

import db from '../database'

import {
  addCreateActivity,
  addDeleteActivity,
  addUpdateActivity,
} from '../services/activity'

const Place = db.define('place', {
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
  mode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isPublic: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  slotSize: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },
  latitude: {
    type: Sequelize.FLOAT,
  },
  longitude: {
    type: Sequelize.FLOAT,
  },
  street: {
    type: Sequelize.STRING,
  },
  cityCode: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  accessibilityInfo: {
    type: Sequelize.STRING,
  },
  capacity: {
    type: Sequelize.STRING,
  },
})

slugify.slugifyModel(Place, {
  source: ['title'],
})

Place.afterCreate(place => {
  return addCreateActivity({
    animalId: place.animalId,
    objectId: place.id,
    objectTitle: place.title,
    objectType: 'place',
  })
})

Place.afterUpdate(place => {
  return addUpdateActivity({
    animalId: place.animalId,
    objectId: place.id,
    objectTitle: place.title,
    objectType: 'place',
  })
})

Place.afterDestroy(place => {
  return addDeleteActivity({
    animalId: place.animalId,
    objectTitle: place.title,
    objectType: 'place',
  })
})

export default Place
