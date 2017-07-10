const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'

export default function generateRandomHash(len) {
  let result = ''
  for (var i = 0; i < len; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length))
  }
  return result
}
