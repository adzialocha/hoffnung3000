import bodyParser from 'body-parser'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import helmet from 'helmet'
import logger from 'morgan'
import methodOverride from 'method-override'
import path from 'path'
import winston from 'winston'

const DEFAULT_PORT = 3000
const ASSETS_MAX_AGE = 31557600000

// load environment variables
const envVariables = dotenv.config({
  path: path.join(__dirname, '..', '.env'),
})

if (envVariables.error && process.env.NODE_ENV !== 'production') {
  winston.error('".env" file does not exist, please configure the app first')
  process.exit(1)
}

// check for public assets folder
const publicDirPath = process.env.NODE_ENV === 'production' ? 'public' : '.tmp'

if (!fs.existsSync(path.join(__dirname, '..', publicDirPath))) {
  winston.error(
    'Public folder "%s" does not exist, please bundle assets first',
    publicDirPath
  )
  process.exit(1)
}

// check database connection
const db = require('./database')

db.sequelize.authenticate().then(() => {
  winston.info('Database connection has been established successfully')
}).catch((err) => {
  winston.error('Unable to connect to the database: %s', err)
  process.exit(1)
})

// initialize express instance
const app = express()
app.set('port', process.env.PORT || DEFAULT_PORT)

if (process.env.NODE_ENV === 'development') {
  app.use(logger('tiny'))
}

// parse body params and attach them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(compress())
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// enforce https on production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''))
    }
    return next()
  })
}

// mount all API routes
app.use('/api', require('./routes'))

// static file hosting
app.use(express.static(
  path.join(__dirname, '..', publicDirPath), {
    index: false,
    redirect: false,
    maxAge: ASSETS_MAX_AGE,
  }
))

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', publicDirPath, 'index.html'))
})

// start server
app.listen(app.get('port'), () => {
  winston.info(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
})
