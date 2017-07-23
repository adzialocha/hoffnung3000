import slugify from 'sequelize-slugify'

import db from '../database'

import Animal from './animal'
import Event from './event'

const Performer = db.sequelize.define('performer', {
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

export const PerformerBelongsToAnimal = Performer.belongsTo(Animal, {
  as: 'animal',
  constraints: false,
  foreignKey: 'animalId',
})

export const PerformerBelongsToManyEvent = Performer.belongsToMany(Event, {
  through: 'performersEvents',
  as: 'events',
  foreignKey: 'performerId',
})

export const EventBelongsToManyPerformer = Event.belongsToMany(Performer, {
  through: 'performersEvents',
  as: 'performers',
  foreignKey: 'eventId',
})

slugify.slugifyModel(Performer, {
  source: ['title'],
})

export default Performer
