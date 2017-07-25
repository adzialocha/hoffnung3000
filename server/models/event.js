import slugify from 'sequelize-slugify'

import db from '../database'

import Animal from './animal'
import Image from './image'
import Place from './place'
import ResourceImage from './resourceImage'
import Slot from './slot'

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

export const EventBelongsToAnimal = Event.belongsTo(Animal, {
  as: 'animal',
  foreignKey: 'animalId',
  onDelete: 'CASCADE',
})

export const EventHasManySlots = Event.hasMany(Slot, {
  as: 'slots',
  foreignKey: 'eventId',
})

export const EventBelongsToPlace = Event.belongsTo(Place, {
  as: 'place',
})

export const EventBelongsToManyImage = Event.belongsToMany(Image, {
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

slugify.slugifyModel(Event, {
  source: ['title'],
})

export default Event
