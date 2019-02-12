import { getConfig } from '../config'

import User from '../models/user'

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

function information(req, res, next) {
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
          // Return all gathered statuses and (filtered) configs
          res.json({
            config: removeSensitive({
              ...config,
              isPayPalEnabled,
              isTransferEnabled,
            }),
            status: {
              isRegistrationFull: count >= config.maximumParticipantsCount,
            },
          })
        })
        .catch(err => next(err))
    })
}

export default {
  information,
}
