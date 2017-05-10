import decode from 'jwt-decode'

export function jwtDecode(token) {
  try {
    return decode(token)
  } catch (error) {
    return null
  }
}
