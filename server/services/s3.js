import AWS from 'aws-sdk'

const BASE_PATH = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/`

export function urlToKey(url) {
  return url.replace(BASE_PATH, '')
}

export function request(method, Key, customParams, customMethod) {
  const defaultParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
  }
  const params = Object.assign({}, defaultParams, customParams)
  const s3 = new AWS.S3({ signatureVersion: 'v4' })

  if (customParams && 'Delete' in customParams) {
    params.Delete = {
      Objects: customParams.Delete.Objects,
    }
  }

  return new Promise((resolve, reject) => {
    let promise

    if (customMethod) {
      // wrap this around a Promise since S3 SDK is not doing this for us
      promise = new Promise((customResolve, customReject) => {
        s3[method](customMethod, params, (err, data) => {
          if (err) {
            customReject(err)
          } else {
            customResolve(data)
          }
        })
      })
    } else {
      promise = s3[method](params).promise()
    }

    promise
      .then((data) => {
        resolve({
          data,
          url: `${BASE_PATH}${Key}`,
        })
      })
      .catch(reject)
  })
}

export function putObject(Body, Key) {
  const params = {
    Body,
    ACL: 'public-read',
  }

  return this.request('putObject', Key, params)
}

export function deleteObjects(urls) {
  const params = {
    Delete: {
      Objects: urls.map((url) => this.urlToKey(url)),
    },
  }

  return this.request('deleteObjects', null, params)
}

export function deleteObject(url) {
  return this.deleteObjects([url])
}

export function getObjectSigned(url) {
  const params = {
    Expires: 60,
  }

  return this.request('getSignedUrl', this.urlToKey(url), params, 'getObject')
}

export function putObjectSigned(key) {
  const params = {
    Expires: 600000,
    ACL: 'authenticated-read',
  }

  return this.request('getSignedUrl', key, params, 'putObject')
}
