import fs from 'fs'
import path from 'path'

import config from '../../config'
import mail from '../services/mail'

const TEMPLATES_PATH = 'mails'

function generateTemplateString(template) {
  const sanitized = template
    .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, (_, match) => {
      return `\$\{map.${match.trim()}\}`
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
    const mergedLocals = Object.assign({}, locals, { config })
    textTemplate(`${TEMPLATES_PATH}/${templateName}.txt`, mergedLocals)
      .then((text) => {
        const mailOptions = {
          subject,
          text,
          to: receiver,
        }

        if (sender) {
          mailOptions.from = sender
        }

        return mail.sendMail(mailOptions, (err) => {
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
  const subject = `${config.title} TRANSFER DETAILS`
  return sendMail(locals, subject, receiver, 'wireTransferDetails')
}

export function sendRegistrationComplete(locals, receiver) {
  const subject = `WELCOME TO ${config.title}`
  return sendMail(locals, subject, receiver, 'registrationComplete')
}

export function sendAdminRegistrationNotification(locals) {
  const subject = 'NEW REGISTRATION'
  return sendMail(
    locals,
    subject,
    config.mailAddressAdmin,
    'adminRegistrationNotification',
    config.mailAddressRobot
  )
}

export function sendPasswordReset(locals, receiver) {
  const subject = 'PASSWORD RESET'
  return sendMail(locals, subject, receiver, 'passwordReset')
}

export function sendActivityNotification(subject, locals, receiver) {
  return sendMail(locals, subject, receiver, 'activityNotification')
}
