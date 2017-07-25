import slugify from 'sequelize-slugify'

import db from '../database'

import Animal from './animal'
import Image from './image'
import ResourceImage from './resourceImage'
import Slot from './slot'

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

export const PlaceBelongsToAnimal = Place.belongsTo(Animal, {
  as: 'animal',
  foreignKey: 'animalId',
  onDelete: 'CASCADE',
})

export const PlaceHasManySlots = Place.hasMany(Slot, {
  as: 'slots',
  targetKey: 'placeId',
})

export const PlaceBelongsToManyImage = Place.belongsToMany(Image, {
  through: {
    model: ResourceImage,
    unique: false,
    scope: {
      resourceName: 'place',
    },
  },
  as: 'images',
  foreignKey: 'resourceId',
  constraints: false,
})

export default Place
