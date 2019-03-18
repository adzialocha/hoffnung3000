const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })

const url = process.env.DATABASE_URL
const dialect = process.env.DATABASE_DIALECT || 'postgres'

const timezone = '+00:00' // UTC

module.exports = {
  development: {
    url,
    dialect,
    timezone,
  },
  staging: {
    url,
    dialect,
    timezone,
  },
  production: {
    url,
    dialect,
    timezone,
  },
}
