import Config from './models/config'

function getConfig(fields) {
  const attributes = (typeof fields === 'string') ? [fields] : fields

  return Config.findOne({
    attributes,
  })
    .then(config => {
      return attributes.reduce((acc, field) => {
        acc[field] = config[field]
        return acc
      }, {})
    })
}

export default {
  getConfig,
}
