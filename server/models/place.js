import slugify from 'sequelize-slugify'

import db from '../database'

// import Slot from './slot'

const Place = db.sequelize.define('place', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: db.Sequelize.DATE,
  },
  updatedAt: {
    type: db.Sequelize.DATE,
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
  isPrivate: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  slotSize: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },
  latitude: {
    type: db.Sequelize.FLOAT,
    allowNull: true,
  },
  longitude: {
    type: db.Sequelize.FLOAT,
    allowNull: true,
  },
  street: {
    type: db.Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  cityCode: {
    type: db.Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  city: {
    type: db.Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  country: {
    type: db.Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
})

slugify.slugifyModel(Place, {
  source: ['title'],
})

// Place.hasMany(Slot)
// Slot.belongsTo(Place)

export default Place
