// Prepare for babel transpiler
require('@babel/register')()

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
import { Settings } from 'luxon'

const ASSETS_FOLDER_NAME = 'static'
const ASSETS_MANIFESTO_FILE = 'webpack-assets.json'
const ASSETS_MAX_AGE = 31557600000

const DEFAULT_PORT = 3000

function getPath(filePath) {
  return path.resolve(__dirname, '..', filePath)
}

// Load environment variables when in development
const envVariables = dotenv.config({ path: getPath('.env') })

// Require logger and AWS methods after we read env variables
const { UPLOAD_FOLDER_PATH, UPLOAD_FOLDER_NAME } = require('./middlewares/upload')
const { hasAWSConfiguration } = require('./services/s3')
const logger = require('./helpers/logger')

function errorAndExit(message) {
  logger.error(message)
  process.exit(1)
}

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
const { renderer } = require('./services/marked')
marked.setOptions({
  breaks: true,
  gfm: true,
  smartypants: true,
  tables: false,
})
marked.use({ renderer })

// Set default timezone
Settings.defaultZoneName = 'utc'

// Check database connection
const db = require('./database')
db.authenticate()
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

// Log HTTP requests
app.use(morgan('dev', {
  stream: {
    write: message => logger.verbose(message.replace('\n', '')),
  },
}))

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

// Mount all API routes
app.use('/api', require('./routes'))

// Static assets hosting
app.use(`/${ASSETS_FOLDER_NAME}`, express.static(
  getPath(ASSETS_FOLDER_NAME), {
    index: false,
    redirect: false,
    maxAge: ASSETS_MAX_AGE,
  }
))

// Expose uploads folder route when we dont use AWS
if (!hasAWSConfiguration()) {
  app.use(`/${UPLOAD_FOLDER_NAME}`, express.static(
    UPLOAD_FOLDER_PATH, {
      index: false,
      redirect: false,
      maxAge: ASSETS_MAX_AGE,
    }
  ))
}

app.use((req, res, next) => {
  // Check if request url contains any extension
  if (path.extname(req.url)) {
    next()
    return
  }

  // Require this here to make sure we've loaded
  // all .env variables first in development mode
  const { getConfig } = require('./config')

  // Serve the webapp if no extension was found
  getConfig(['title', 'description', 'baseUrl'])
    .then(config => {
      res.render('index', {
        assets,
        config,
      })
    })
})

// Start server
app.listen(app.get('port'), () => {
  logger.info(
    `Server is listening at port ${app.get('port')} in ${app.get('env')} mode`
  )
})
