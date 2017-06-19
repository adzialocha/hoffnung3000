const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })

const url = process.env.DATABASE_URL
const dialect = process.env.DATABASE_DIALECT || 'postgres'

module.exports = {
  development: {
    url,
    dialect,
  },
  staging: {
    url,
    dialect,
  },
  production: {
    url,
    dialect,
  },
}
