import AWS from 'aws-sdk'

const BASE_PATH = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/`

function urlToKey(url) {
  return url.replace(BASE_PATH, '')
}

function request(method, Key, customParams, customMethod) {
  const defaultParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
  }

  if (Key) {
    defaultParams.Key = Key
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
      // Wrap this around a Promise since S3 SDK is not doing this for us
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
      .then(data => {
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

  return request('putObject', Key, params)
}

export function deleteObjects(urls) {
  const params = {
    Delete: {
      Objects: urls.map(url => { return { Key: urlToKey(url) } }),
    },
  }

  return request('deleteObjects', null, params)
}

export function deleteObject(url) {
  return deleteObjects([url])
}
