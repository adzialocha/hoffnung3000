import fs from 'fs'
import path from 'path'

import { UPLOAD_FOLDER_NAME, UPLOAD_FOLDER_PATH } from '../middlewares/upload'
import { hasAWSConfiguration, putObject, deleteObjects } from './s3'

const AWS_BUCKET_PATH = 'uploads/'

function cleanFileName(filePath) {
  return path.basename(filePath)
}

export function uploadImage(buffer, fileName) {
  if (hasAWSConfiguration()) {
    return putObject(buffer, `${AWS_BUCKET_PATH}${fileName}`)
  }

  return new Promise((resolve, reject) => {
    const filePath = path.join(
      UPLOAD_FOLDER_PATH,
      fileName
    )

    fs.writeFile(filePath, buffer, 'binary', err => {
      if (err) {
        reject(err)
      } else {
        resolve({
          url: `/${UPLOAD_FOLDER_NAME}/${fileName}`,
        })
      }
    })
  })
}

export function deleteImages(images) {
  if (hasAWSConfiguration()) {
    return deleteObjects(images)
  }

  const promises = images.map(fileName => {
    const filePath = path.join(
      UPLOAD_FOLDER_PATH,
      cleanFileName(fileName)
    )

    return new Promise((resolve, reject) => {
      fs.unlink(filePath, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  })

  return Promise.all(promises)
}
