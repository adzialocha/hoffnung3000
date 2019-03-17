import fs from 'fs'
import path from 'path'

import logger from '../helpers/logger'
import mail from '../services/mail'
import { getConfig } from '../config'

const TEMPLATES_PATH = 'mails'

function generateTemplateString(template) {
  const sanitized = template
    .replace(/\$\{([\s]*[^;\s{]+[\s]*)\}/g, (_, match) => {
      return `$\{map.${match.trim()}}`
    })
    .replace(/(\$\{(?!map\.)[^}]+\})/g, '')

  return Function('map', `return \`${sanitized}\``) // eslint-disable-line no-new-func
}

function textTemplate(url, locals) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '../', url)

    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        reject(err)
        return
      }

      const template = generateTemplateString(content)
      const str = template(locals)

      resolve(str)
    })
  })
}

function sendMail(locals, subject, receiver, templateName, sender) {
  return new Promise((resolve, reject) => {
    textTemplate(`${TEMPLATES_PATH}/${templateName}.txt`, locals)
      .then(text => {
        const mailOptions = {
          subject,
          text,
          from: sender,
          to: receiver,
        }

        // Do not send real emails when in development
        if (process.env.NODE_ENV === 'development') {
          logger.info(`Send mail: ${JSON.stringify(mailOptions)}`)
          return resolve()
        }

        return mail.sendMail(mailOptions, err => {
          if (err) {
            reject(err)
            return
          }

          resolve()
        })
      })
      .catch(reject)
  })
}

export function sendWireTransferDetails(locals, receiver) {
  return getConfig()
    .then(config => {
      const subject = `${config.title} TRANSFER DETAILS`

      return sendMail(
        { ...locals, config },
        subject,
        receiver,
        'wireTransferDetails',
        config.mailAddressAdmin,
      )
    })
}

export function sendRegistrationComplete(locals, receiver) {
  return getConfig()
    .then(config => {
      const subject = `WELCOME TO ${config.title}`

      return sendMail(
        { ...locals, config },
        subject,
        receiver,
        'registrationComplete',
        config.mailAddressAdmin
      )
    })
}

export function sendAdminRegistrationNotification(locals) {
  return getConfig()
    .then(config => {
      const subject = 'NEW REGISTRATION'

      return sendMail(
        { ...locals, config },
        subject,
        config.mailAddressAdmin,
        'adminRegistrationNotification',
        config.mailAddressRobot
      )
    })
}

export function sendPasswordReset(locals, receiver) {
  return getConfig()
    .then(config => {
      const subject = 'PASSWORD RESET'

      return sendMail(
        { ...locals, config },
        subject,
        receiver,
        'passwordReset',
        config.mailAddressAdmin
      )
    })
}

export function sendActivityNotification(subject, locals, receiver) {
  return getConfig()
    .then(config => {
      return sendMail(
        { ...locals, config },
        subject,
        receiver,
        'activityNotification',
        config.mailAddressAdmin
      )
    })
}
