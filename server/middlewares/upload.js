import crypto from 'crypto'
import fs from 'fs'
import httpStatus from 'http-status'
import mime from 'mime'
import multer  from 'multer'
import path from 'path'

import { APIError } from '../helpers/errors'

const VALID_FILE_TYPES = [
  'jpeg',
  'jpg',
  'png',
]

const MAX_FILE_SIZE = 5242880

export const UPLOAD_FOLDER_NAME = 'uploads'

export const UPLOAD_FOLDER_PATH = path.join(__dirname, '..', '..', UPLOAD_FOLDER_NAME)

function generateFileName(ext = 'jpg') {
  return new Promise(resolve => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      resolve((err ? undefined : raw.toString('hex')) + '.' + ext)
    })
  })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOAD_FOLDER_PATH)) {
      fs.mkdirSync(UPLOAD_FOLDER_PATH)
    }

    cb(null, UPLOAD_FOLDER_PATH)
  },
  filename: (req, file, cb) => {
    generateFileName().then(name => {
      cb(null, name)
    })
  },
})

function fileFilter(req, file, cb) {
  const type = mime.getExtension(file.mimetype)
  const isValid = VALID_FILE_TYPES.includes(type)

  if (!isValid) {
    cb(new APIError('Invalid file format', httpStatus.BAD_REQUEST), false)
  } else if (file.size > MAX_FILE_SIZE) {
    cb(new APIError('File is too large', httpStatus.BAD_REQUEST), false)
  } else {
    cb(null, true)
  }
}

const upload = multer({
  fileFilter,
  storage,
}).array('images')

export default function(req, res, next) {
  upload(req, res, err => {
    if (err) {
      return next(err)
    }

    const response = req.files.map(file => file.filename)
    return res.json(response)
  })
}
