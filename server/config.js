import Config from './models/config'

function getConfig(fields = []) {
  const attributes = (typeof fields === 'string') ? [fields] : fields
  const query = (attributes.length > 0) ? { attributes } : {}

  return Config.findOne(query)
    .then(config => {
      if (attributes.length === 0) {
        return config
      }

      return attributes.reduce((acc, field) => {
        acc[field] = config[field]
        return acc
      }, {})
    })
}

export default {
  getConfig,
}
