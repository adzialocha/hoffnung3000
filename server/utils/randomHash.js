import crypto from 'crypto'

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'

export function generateRandomString(len = 24) {
  let result = ''
  for (let i = 0; i < len; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length))
  }
  return result
}

export function generateRandomHash(len = 24) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(len, (err, buf) => {
      if (err) {
        reject(err)
      } else {
        resolve(buf.toString('hex'))
      }
    })
  })
}
