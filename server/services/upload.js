import crypto from 'crypto'
import mime from 'mime'
import multer  from 'multer'
import path from 'path'

const VALID_FILE_TYPES = [
  'jpeg',
  'jpg',
  'png',
]

function generateFileName(file) {
  return new Promise(resolve => {
    let ext = path.extname(file.originalname)
    ext = ext.length > 1 ? ext : '.' + mime.extension(file.mimetype)

    crypto.pseudoRandomBytes(16, (err, raw) => {
      resolve((err ? undefined : raw.toString('hex')) + ext)
    })
  })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // take the system default tmp folder and our own when in development
    let uploadFolder = undefined
    if (process.env.NODE_ENV === 'development') {
      uploadFolder = './tmp/uploads'
    }

    cb(null, uploadFolder)
  },
  filename: (req, file, cb) => {
    generateFileName(file).then((name) => {
      cb(null, name)
    })
  },
})

function fileFilter(req, file, cb) {
  const type = mime.extension(file.mimetype)
  cb(null, VALID_FILE_TYPES.includes(type))
}

export default multer({ storage, fileFilter })
