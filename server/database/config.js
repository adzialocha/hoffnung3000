const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })

module.exports = {
  development: {
    url: process.env.POSTGRES_URI,
    dialect: 'postgres',
  },
  production: {
    url: process.env.POSTGRES_URI,
    dialect: 'postgres',
  },
}
