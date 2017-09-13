import nodemailer from 'nodemailer'

import Brand from '../models/Brand'

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN
  }
})

export const sendEmail1 = (mail) => {
  const { to, toSubject, toBody, fromSubject, fromBody } = mail
  return Brand.findOne({})
    .then(brand => {
      if (!brand) return Promise.reject('No brand found')
      const {
        appBar: {
          values: { fontFamily }
        },
        business: {
          image,
          values: {
            name,
            phone,
            email,
            street,
            city,
            state,
            zip
          }
        }
      } = brand
      const signature = `
        ${image ? `<img src=${image.src} alt="item" height="64px" width="auto"/>` : ''}
        <div>${name}</div>
        <div>
          <a href="mailto:${process.env.GMAIL_USER}" style="color: black; text-decoration: none;">
            ${process.env.GMAIL_USER}
          </a>
        </div>
        ${street ? `<div>${street}</div>` : '' }
        ${zip ? `<div>${city} ${state}, ${zip}</div>` : '' }
      `
      const userMail = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: toSubject,
        html: `${toBody}<br/>${signature}`
      }
      if (fromSubject) {
        const adminMail = {
          from: process.env.GMAIL_USER,
          to: process.env.GMAIL_USER,
          subject: fromSubject,
          html: `${fromBody}<br/>${signature}`
        }
        transporter.sendMail(adminMail)
      }
      return transporter.sendMail(userMail)
        .then(info => info)
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}
