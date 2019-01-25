import Sequelize from 'sequelize'
import slugify from 'sequelize-slugify'

import db from '../database'

import {
  addCreateActivity,
  addDeleteActivity,
  addUpdateActivity,
} from '../services/activity'

const Event = db.define('event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  placeId: {
    type: Sequelize.INTEGER,
  },
  animalId: {
    type: Sequelize.INTEGER,
  },
  isPublic: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
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

slugify.slugifyModel(Event, {
  source: ['title'],
})

Event.afterCreate(event => {
  return addCreateActivity({
    animalId: event.animalId,
    objectId: event.id,
    objectTitle: event.title,
    objectType: 'event',
  })
})

Event.afterUpdate(event => {
  return addUpdateActivity({
    animalId: event.animalId,
    objectId: event.id,
    objectTitle: event.title,
    objectType: 'event',
  })
})

Event.afterDestroy(event => {
  return addDeleteActivity({
    animalId: event.animalId,
    objectTitle: event.title,
    objectType: 'event',
  })
})

export default Event
