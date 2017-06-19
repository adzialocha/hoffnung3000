import nodemailer from 'nodemailer'

export default nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}, {
  from: process.env.SMTP_FROM_MAIL,
})
