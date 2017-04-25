import bcrypt from 'bcrypt'

import db from '../database'

const User = db.sequelize.define('user', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastname: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: db.Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  hooks: {
    beforeCreate: user => {
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync(user.password, salt)
    },
  },
  classMethods: {
    comparePasswords: (encodedPassword, password) => {
      return bcrypt.compareSync(password, encodedPassword)
    },
  },
})

export default User
