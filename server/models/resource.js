import slugify from 'sequelize-slugify'

import db from '../database'

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

slugify.slugifyModel(Resource, {
  source: ['title'],
})

export default Resource
