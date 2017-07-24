import fs from 'fs'
import sharp  from 'sharp'

import Image from '../models/Image'
import s3 from '../services/s3'

const BUCKET_PATH = 'uploads/'
const IMAGE_FILE_FORMAT = 'jpeg'
const IMAGE_VERSIONS = [{
  height: 1600,
  name: 'large',
  quality: 80,
  width: 1600,
},
{
  height: 900,
  name: 'medium',
  quality: 80,
  width: 900,
},
{
  height: 400,
  name: 'small',
  quality: 90,
  width: 400,
}]

function resizeAndUpload(path, key, width, height, quality) {
  return new Promise((resolve, reject) => {
    sharp(path)
      .resize(width, height)
      .max()
      .toFormat(IMAGE_FILE_FORMAT, { quality })
      .toBuffer()
      .then(buffer => {
        s3.putObject(buffer, key)
          .then(resolve)
          .catch(reject)
      })
      .catch(reject)
  })
}

function addSuffix(name, suffix = 'original', ext = 'jpg') {
  if (suffix === 'original') {
    return `${name.substring(0, name.lastIndexOf('.'))}.${ext}`
  }

  return `${name.substring(0, name.lastIndexOf('.'))}-${suffix}.${ext}`
}

function createImageVersions(file) {
  const promises = []

  IMAGE_VERSIONS.forEach(version => {
    const promise = new Promise((resolve, reject) => {
      const key = `${BUCKET_PATH}${addSuffix(file.filename, version.name)}`

      resizeAndUpload(
        file.path,
        key,
        version.width,
        version.height,
        version.quality
      )
        .then(result => {
          resolve({
            key: result.url,
            name: version.name,
          })
        })
        .catch(reject)
    })

    promises.push(promise)
  })

  return Promise.all(promises)
}

function storeImageInDatabase(resizeResults) {
  const images = resizeResults.map(image => {
    const data = {}

    image.forEach(imageVersion => {
      data[`${imageVersion.name}ImageUrl`] = imageVersion.key
    })

    return data
  })

  return Image.bulkCreate(images)
    .then(result => resolve(result))
}

export default {
  uploadImages: (req, res, next) => {
    const resizePromises = []

    req.files.forEach(originalImage => {
      resizePromises.push(createImageVersions(originalImage))
    })

    return Promise.all(resizePromises)
      .then(resizeResults => {
        // remove temporary files
        req.files.forEach(file => {
          fs.unlink(file.path)
        })

        // store in database
        return storeImageInDatabase(resizeResults)
      })
      .then(data => {
        res.json({ data })
      })
      .catch(err => next(err))
  },
}
