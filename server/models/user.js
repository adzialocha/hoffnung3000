import bcrypt from 'bcrypt'

import db from '../database'

function generateHash(str) {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(str, salt)
}

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
  token: {
    type: db.Sequelize.STRING,
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
      user.password = generateHash(user.password)
    },
  },
  classMethods: {
    comparePasswords: (encodedPassword, password) => {
      return bcrypt.compareSync(password, encodedPassword)
    },
  },
})

export default User
