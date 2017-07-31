import slugify from 'sequelize-slugify'

import db from '../database'

import {
  addCreateActivity,
  addDeleteActivity,
  addUpdateActivity,
} from '../services/activity'

const Place = db.sequelize.define('place', {
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
  mode: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isPublic: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  slotSize: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },
  latitude: {
    type: db.Sequelize.FLOAT,
  },
  longitude: {
    type: db.Sequelize.FLOAT,
  },
  street: {
    type: db.Sequelize.STRING,
  },
  cityCode: {
    type: db.Sequelize.STRING,
  },
  city: {
    type: db.Sequelize.STRING,
  },
  country: {
    type: db.Sequelize.STRING,
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
