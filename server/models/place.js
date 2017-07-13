import slugify from 'sequelize-slugify'

import db from '../database'

import Animal from './animal'

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

export const PlaceBelongsToAnimal = Place.belongsTo(Animal, {
  as: 'animal',
  constraints: false,
  foreignKey: 'animalId',
})

export default Place
