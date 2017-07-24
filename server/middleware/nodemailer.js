import nodemailer from 'nodemailer'

import Brand from '../models/Brand'

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
    .then(brand => {
      if (!brand) return Promise.reject({ error: 'No brand found'})
      const { image, business } = brand
      const { name, phone, email, street, city, state, zip } = business
      const signature = `
      ${image ? `<img src=${image.src} alt="item" height="64px" width="auto"/>` : `<div>${name}</div>`}
      <div>
        <a href="mailto:${process.env.GMAIL_USER}" style="color: black; text-decoration: none;">
          ${process.env.GMAIL_USER}
        </a>
      </div>
      ${street ? `<div>${street}</div>` : null }
      ${zip ? `<div>${city} ${state}, ${zip}</div>` : null }
      `
      const userMail = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: toSubject,
        html: `${toBody}<br/>${signature}`
      }
      const adminMail = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: fromSubject,
        html: `${fromBody}<br/>${signature}`
      }
      transporter.sendMail(adminMail)
      return transporter.sendMail(userMail)
        .then(info => info)
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}
