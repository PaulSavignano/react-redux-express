import nodemailer from 'nodemailer'

import Brand from '../brands/models/Brand'

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: 'ya29.GlsbBO5fX9tqpPNqhGYgPkh_sSturCpksSiGMF9_qOo8qCka9pvfK88vSY3shhCZL5oh1LCjDlQbmfo2pQfpXlcsPOsre3AytG3550SLO1L5S1nw3y_fMTyY5L-e',
    expires: 30000
  }
})

export const sendEmail1 = (mail) => {
  const { to, toSubject, name, toBody, fromSubject, fromBody } = mail
  Brand.findOne({})
    .then(doc => {
      const brand = `
      ${doc.image ? `<img src=${doc.image} alt="item"/>` : `<div>${doc.name}</div>`}
      <div>${process.env.GMAIL_USER}</div>
      ${doc.values.address ? `<div>${doc.values.address}</div>` : ''}
      ${doc.values.zip ? `<div>${doc.values.city} ${doc.values.state}, ${doc.values.zip}</div>` : ''}
      `
      const userMail = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: toSubject,
        html: `
          <p>Hi ${name},</p>
          <p>${body}</p>
          <br/>
          ${brand}
        `
      }
      const adminMail = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: fromSubject,
        html: `
          <div>${fromSubject}</div>
          <div>${body}</div>
          <br/>
          ${brand}
        `
      }
      return transporter.sendMail(userMail)
        .then(info => {
          transporter.sendMail(adminMail)
          return info
        })
        .catch(err => err)
    })
    .catch(err => res.status(400).send(err))

}
