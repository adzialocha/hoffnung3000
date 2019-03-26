import Sequelize from 'sequelize'

import db from '../database'

const Page = db.define('page', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  isRemovable: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
})

export default Page
