export default function pick(fields, obj) {
  return fields.reduce((result, fieldName) => {
    if (typeof obj[fieldName] !== 'undefined') {
      result[fieldName] = obj[fieldName]
    }
    return result
  }, {})
}
