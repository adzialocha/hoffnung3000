import fs from 'fs'
import path from 'path'

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
        return reject(err)
      }

      const template = generateTemplateString(content)
      const str = template(locals)
      return resolve(str)
    })
  })
}

function sendMail(locals, subject, receiver, templateName) {
  return new Promise((resolve, reject) => {
    textTemplate(`${TEMPLATES_PATH}/${templateName}.txt`, locals)
      .then((text) => {
        const mailOptions = {
          subject,
          text,
          to: receiver,
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
