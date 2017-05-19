import nodemailer from 'nodemailer'

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
  const { to, subject, name, body } = mail
  const userMail = {
    from: process.env.GMAIL_USER,
    to: to,
    subject: subject,
    html: `
      <p>Hi ${name},</p>
      <p>${body}</p>
      <p>
        Paul Savignano<br />
        1234 Pattern Ln<br />
        Carlsbad, CA.<br />
      </p>
    `
  }
  const adminMail = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: subject,
    html: `
      <p>${name} just sent you an email.</p>
      <p>${body}</p>
      <p>
        Paul Savignano<br />
        1234 Pattern Ln<br />
        Carlsbad, CA.<br />
      </p>
    `
  }
  return transporter.sendMail(userMail)
    .then(info => {
      transporter.sendMail(adminMail)
      return info
    })
    .catch(err => err)
}
