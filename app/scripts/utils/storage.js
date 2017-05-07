const NAMESPACE = `h3k-${process.env.NODE_ENV}`

function makeKey(key) {
  return `${NAMESPACE}-${key}`
}

export function getItem(key) {
  return localStorage.getItem(makeKey(key))
}

export function setItem(key, value) {
  return localStorage.setItem(makeKey(key), value)
}

export function removeItem(key) {
  return localStorage.removeItem(makeKey(key))
}
