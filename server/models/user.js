import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'

import db from '../database'

export function generateHash(str) {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(str, salt)
}

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    set(val) {
      this.setDataValue('password', generateHash(val))
    },
  },
  passwordResetAt: {
    type: Sequelize.DATE,
  },
  passwordResetToken: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  paymentId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  paymentMethod: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isParticipant: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isVisitor: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
})

// Instance methods
User.prototype.comparePasswords = function compare(password) {
  return bcrypt.compareSync(password, this.password)
}

User.prototype.toJSON = function convert() {
  const data = this.get()

  delete data.password
  delete data.passwordResetAt
  delete data.passwordResetToken

  return Object.assign({}, {
    ...data,
  })
}

export default User
