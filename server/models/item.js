import slugify from 'sequelize-slugify'

import db from '../database'

import Animal from './animal'
import Event from './event'

const Item = db.sequelize.define('item', {
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

export const ItemBelongsToAnimal = Item.belongsTo(Animal, {
  as: 'animal',
  foreignKey: 'animalId',
})

export const ItemBelongsToManyEvent = Item.belongsToMany(Event, {
  through: 'itemsEvents',
  as: 'events',
  foreignKey: 'itemId',
})

export const EventBelongsToManyItem = Event.belongsToMany(Item, {
  through: 'itemsEvents',
  as: 'items',
  foreignKey: 'eventId',
})

slugify.slugifyModel(Item, {
  source: ['title'],
})

export default Item
