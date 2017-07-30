import slugify from 'sequelize-slugify'

import db from '../database'

import {
  addCreateActivity,
  addDeleteActivity,
  addUpdateActivity,
} from '../services/activity'

const Event = db.sequelize.define('event', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  placeId: {
    type: db.Sequelize.INTEGER,
  },
  animalId: {
    type: db.Sequelize.INTEGER,
  },
  isPublic: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
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
