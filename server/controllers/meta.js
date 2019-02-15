import { getConfig } from '../config'

import Config from '../models/config'
import User from '../models/user'

const CONFIG_NAME = 'default'

const TRANSFER_CONFIG = [
  'transferReceiverName',
  'transferBankName',
  'transferIBAN',
  'transferBIC',
]

const SENSITIVE_CONFIG = [
  'mailAddressAdmin',
  'mailAddressRobot',
  ...TRANSFER_CONFIG,
]

function removeSensitive(config) {
  return Object.keys(config).reduce((acc, key) => {
    if (!SENSITIVE_CONFIG.includes(key)) {
      acc[key] = config[key]
    }

    return acc
  }, {})
}

function hasRequiredFields(fields, config) {
  return !fields.some(key => {
    return !((key in config) && config[key])
  })
}

function getStatusAndConfig(req, res, next, hasSensitiveFields = false) {
  // Check if all variables are set to enable PayPal payment
  const isPayPalEnabled = hasRequiredFields([
    'PAYPAL_ID',
    'PAYPAL_SECRET',
    'PAYPAL_RETURN_URL',
    'PAYPAL_CANCEL_URL',
  ], process.env)

  return getConfig()
    .then(config => {
      // Check the same for wire transfer
      const isTransferEnabled = hasRequiredFields(TRANSFER_CONFIG, config)

      // Find out if we still have enough space for sign ups
      return User.count({
        where: {
          isParticipant: true,
        },
      })
        .then(count => {
          const { maximumParticipantsCount } = config
          const isRegistrationFull = maximumParticipantsCount ? count >= maximumParticipantsCount : false

          const mergedConfig = {
            ...config,
            isPayPalEnabled,
            isTransferEnabled,
          }

          const filteredConfig = hasSensitiveFields ? mergedConfig : removeSensitive(mergedConfig)

          // Return all gathered statuses and (filtered) configs
          res.json({
            config: filteredConfig,
            status: {
              isRegistrationFull,
            },
          })
        })
        .catch(err => next(err))
    })
}

function updateConfig(req, res, next) {
  return Config.update(req.body, { limit: 1, where: {
    app: CONFIG_NAME,
  } })
    .then(() => {
      return getStatusAndConfig(req, res, next, true)
    })
    .catch(err => next(err))
}

export default {
  getStatusAndConfig,
  getStatusAndSensitiveConfig: (req, res, next) => {
    return getStatusAndConfig(req, res, next, true)
  },
  updateConfig,
}
