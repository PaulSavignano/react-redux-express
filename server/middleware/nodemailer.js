import nodemailer from 'nodemailer'

import Brand from '../brands/models/Brand'

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
    expires: 30000
  }
})

export const sendEmail1 = (mail) => {
  const { to, toSubject, toBody, fromSubject, fromBody } = mail
  return Brand.findOne({})
    .then(doc => {
      const brand = `
      ${doc.image ? `<img src=${doc.image} alt="item" height="64px" width="auto"/>` : `<div>${doc.name}</div>`}
      <div>
        <a href="mailto:${process.env.GMAIL_USER}" style="color: black; text-decoration: none;">
          ${process.env.GMAIL_USER}
        </a>
      </div>
      ${doc.values.street ? `<div>${doc.values.street}</div>` : ''}
      ${doc.values.zip ? `<div>${doc.values.city} ${doc.values.state}, ${doc.values.zip}</div>` : ''}
      `
      const userMail = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: toSubject,
        html: `${toBody}<br/>${brand}`
      }
      const adminMail = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: fromSubject,
        html: `${fromBody}<br/>${brand}`
      }
      transporter.sendMail(adminMail)
      return transporter.sendMail(userMail)
        .then(info => {
          return info
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(err)
    })
}
