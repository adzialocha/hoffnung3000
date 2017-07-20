import slugify from 'sequelize-slugify'

import db from '../database'

import Animal from './animal'

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
  constraints: false,
  foreignKey: 'animalId',
})

slugify.slugifyModel(Item, {
  source: ['title'],
})

export default Item
