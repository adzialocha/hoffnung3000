import nodemailer from 'nodemailer'

import config from '../../config'

export default nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}, {
  from: config.mailAddressAdmin,
})
