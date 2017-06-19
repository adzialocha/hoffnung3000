export default function pick(fields, obj) {
  const res = fields.reduce((result, fieldName) => {
    if (typeof obj[fieldName] !== 'undefined') {
      result[fieldName] = obj[fieldName]
    }
    return result
  }, {})

  return res
}
