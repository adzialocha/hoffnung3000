import marked from 'marked'

import db from '../database'

const Page = db.sequelize.define('page', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    defaultValue: '',
  },
})

// instance methods
Page.prototype.toJSON = function convert() {
  const {
    id,
    slug,
    title,
    content,
  } = this.get()

  return Object.assign({}, {
    id,
    slug,
    title,
    content,
    content_html: marked(content),
  })
}

export default Page
