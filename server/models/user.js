import bcrypt from 'bcrypt'

import db from '../database'

export function generateHash(str) {
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
    set(val) {
      this.setDataValue('password', generateHash(val))
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
  phone: {
    type: db.Sequelize.STRING,
  },
  street: {
    type: db.Sequelize.STRING,
  },
  cityCode: {
    type: db.Sequelize.STRING,
  },
  city: {
    type: db.Sequelize.STRING,
  },
  country: {
    type: db.Sequelize.STRING,
  },
  paymentId: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  paymentMethod: {
    type: db.Sequelize.STRING,
    allowNull: true,
  },
  isActive: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isAdmin: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isParticipant: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isVisitor: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
})

// instance methods
User.prototype.comparePasswords = function compare(password) {
  return bcrypt.compareSync(password, this.password)
}

User.prototype.toJSON = function convert() {
  const data = this.get()
  delete data.password

  return Object.assign({}, {
    ...data,
  })
}

export default User
