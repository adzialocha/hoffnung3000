import fs from 'fs'
import path from 'path'
import sharp  from 'sharp'

import { putObject } from '../services/s3'

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

function resizeAndUpload(filePath, key, width, height, quality) {
  return sharp(filePath)
    .resize(width, height)
    .max()
    .toFormat(IMAGE_FILE_FORMAT, { quality })
    .toBuffer()
    .then(buffer => {
      return putObject(buffer, key)
    })
}

function addSuffix(name, suffix = 'original', ext = 'jpg') {
  if (suffix === 'original') {
    return `${name.substring(0, name.lastIndexOf('.'))}.${ext}`
  }

  return `${name.substring(0, name.lastIndexOf('.'))}-${suffix}.${ext}`
}

function createImageVersions(fileName, filePath) {
  const promises = []

  IMAGE_VERSIONS.forEach(version => {
    const promise = new Promise((resolve, reject) => {
      const key = `${BUCKET_PATH}${addSuffix(fileName, version.name)}`

      resizeAndUpload(
        filePath,
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

function prepareImageData(resizeResults) {
  const data = {}

  resizeResults.forEach(imageVersion => {
    data[`${imageVersion.name}ImageUrl`] = imageVersion.key
  })

  return data
}

export function createAndUploadImageVersions(fileName) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '.tmp',
      'uploads',
      fileName
    )

    if (!fs.existsSync(filePath)) {
      return reject(
        new Error('Temporary file does not exist')
      )
    }

    return createImageVersions(fileName, filePath)
      .then(resizeResults => {
        // remove temporary file
        fs.unlink(filePath)

        resolve(prepareImageData(resizeResults))
      })
      .catch(err => reject(err))
  })
}
