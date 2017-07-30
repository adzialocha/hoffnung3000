import slugify from 'sequelize-slugify'

import db from '../database'

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

export default Event
