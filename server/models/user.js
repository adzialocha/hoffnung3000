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
  instanceMethods: {
    comparePasswords(password) {
      return bcrypt.compareSync(password, this.password)
    },
    toJSON() {
      const { id, firstname, lastname, email } = this.get()
      return Object.assign({}, {
        id,
        firstname,
        lastname,
        email,
      })
    },
  },
})

export default User
