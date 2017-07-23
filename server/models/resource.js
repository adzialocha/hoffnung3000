import slugify from 'sequelize-slugify'

import db from '../database'

import Animal from './animal'
import Event from './event'

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

export const ResourceBelongsToAnimal = Resource.belongsTo(Animal, {
  as: 'animal',
  foreignKey: 'animalId',
  onDelete: 'CASCADE',
})

export const ResourceBelongsToManyEvent = Resource.belongsToMany(Event, {
  as: 'events',
  foreignKey: 'resourceId',
  onDelete: 'CASCADE',
  through: 'resourcesEvents',
})

export const EventBelongsToManyResource = Event.belongsToMany(Resource, {
  as: 'resources',
  foreignKey: 'eventId',
  onDelete: 'CASCADE',
  through: 'resourcesEvents',
})

slugify.slugifyModel(Resource, {
  source: ['title'],
})

export default Resource
