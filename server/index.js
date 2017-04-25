import bodyParser from 'body-parser'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import methodOverride from 'method-override'
import path from 'path'
import winston from 'winston'

const DEFAULT_PORT = 3000
const ASSETS_MAX_AGE = 31557600000
const ENV_FILE_PATH = path.join(__dirname, '..', '.env')
const PUBLIC_DIR_PATH = path.join(__dirname, '..', 'public')

// load environment variables
const result = dotenv.config({ path: ENV_FILE_PATH })

if (result.error) {
  winston.error(result.error)
  process.exit(1)
}

// initialize express instance
const app = express()
app.set('port', process.env.PORT || DEFAULT_PORT)

if (process.env.NODE_ENV === 'development') {
  app.use(logger('tiny'))
}

// parse body params and attache them to req.body
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

// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// public assets
app.use(express.static(
  PUBLIC_DIR_PATH, {
    index: false,
    redirect: false,
    maxAge: ASSETS_MAX_AGE,
  }
))

// mount all API routes
app.use('/api', require('./routes'))

// main view serving app
app.use((req, res) => {
  res.render('app')
})

// start express server
app.listen(app.get('port'), () => {
  winston.info(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
})
