import fs from 'fs'
import path from 'path'

import mail from '../services/mail'

const BOT_MAIL = 'roboter@hoffnung3000.de'
const MAIN_EMAIL = 'kontakt@hoffnung3000.de'
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
        return reject(err)
      }

      const template = generateTemplateString(content)
      const str = template(locals)
      return resolve(str)
    })
  })
}

function sendMail(locals, subject, receiver, templateName, sender) {
  return new Promise((resolve, reject) => {
    textTemplate(`${TEMPLATES_PATH}/${templateName}.txt`, locals)
      .then((text) => {
        const mailOptions = {
          subject,
          text,
          to: receiver,
        }

        if (sender) {
          mailOptions.from = sender
        }

        mail.sendMail(mailOptions, (err) => {
          if (err) {
            return reject(err)
          }
          return resolve()
        })
      })
      .catch(reject)
  })
}

export function sendWireTransferDetails(locals, receiver) {
  const subject = 'HOFFNUNG 3000 TRANSFER DETAILS'
  return sendMail(locals, subject, receiver, 'wireTransferDetails')
}

export function sendRegistrationComplete(locals, receiver) {
  const subject = 'WELCOME TO HOFFNUNG 3000'
  return sendMail(locals, subject, receiver, 'registrationComplete')
}

export function sendAdminRegistrationNotification(locals) {
  const subject = 'NEW REGISTRATION'
  return sendMail(
    locals,
    subject,
    MAIN_EMAIL,
    'adminRegistrationNotification',
    BOT_MAIL
  )
}
