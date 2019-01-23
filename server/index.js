import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import helmet from 'helmet'
import marked from 'marked'
import methodOverride from 'method-override'
import morgan from 'morgan'
import path from 'path'
import sequelize from 'sequelize'
import winston from 'winston'

import logger from './helpers/logger'

const ASSETS_FOLDER_NAME = 'static'
const ASSETS_MANIFESTO_FILE = 'webpack-assets.json'
const ASSETS_MAX_AGE = 31557600000

const DEFAULT_PORT = 3000

function getPath(filePath) {
  return path.resolve(__dirname, '..', filePath)
}

function errorAndExit(message) {
  logger.error(message)
  process.exit(1)
}

// Load environment variables when in development
const envVariables = dotenv.config({
  path: getPath('.env'),
})

if (envVariables.error && process.env.NODE_ENV === 'development') {
  errorAndExit('".env" file does not exist, please configure the app first')
}

// Read build manifesto for asset file paths
const assetsPath = getPath(ASSETS_MANIFESTO_FILE)

if (!fs.existsSync(assetsPath)) {
  errorAndExit(`"${ASSETS_MANIFESTO_FILE}" was not found, please bundle assets first`)
}

const assets = require(assetsPath)
assets.basePath = ASSETS_FOLDER_NAME

// Check for public assets folder
if (!fs.existsSync(getPath(ASSETS_FOLDER_NAME))) {
  errorAndExit(`Assets folder "${ASSETS_FOLDER_NAME}" does not exist, please bundle assets first`)
}

// Markdown settings
marked.setOptions({
  breaks: true,
  gfm: true,
  sanitize: true,
  smartypants: true,
  tables: false,
})

// Moment settings
// @TODO Check if we really want to keep using moment-js here
// moment.tz.setDefault(config.timezone)

// Check database connection
const db = require('./database')
db.sequelize.authenticate()
  .then(() => {
    logger.info('Database connection has been established successfully')
  })
  .catch(err => {
    errorAndExit(`Unable to connect to database: ${err}`)
  })

// Initialize express instance
const app = express()
app.set('port', process.env.PORT || DEFAULT_PORT)
app.set('x-powered-by', false)
app.set('view engine', 'pug')
app.set('views', __dirname)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Enable compression and parsing requests
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(methodOverride())

// Secure application by setting various HTTP headers
app.use(helmet())

// Setup CORS - Cross Origin Resource Sharing
app.use(cors())

// Enforce https on production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''))
    }
    return next()
  })
}

// Mount all API routes
// @TODO
// app.use('/api', require('./routes'))

// Static assets hosting
app.use(`/${ASSETS_FOLDER_NAME}`, express.static(
  getPath(ASSETS_FOLDER_NAME), {
    index: false,
    redirect: false,
    maxAge: ASSETS_MAX_AGE,
  }
))

app.use((req, res, next) => {
  // Check if request url contains any extension
  if (path.extname(req.url)) {
    next()
    return
  }

  // .. otherwise serve the webapp
  res.render('index', {
    assets,
  })
})

// Start server
app.listen(app.get('port'), () => {
  logger.info(
    'Server is listening at port %d in %s mode',
    app.get('port'),
    app.get('env')
  )
})
