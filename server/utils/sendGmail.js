import nodemailer from 'nodemailer'

import Brand from '../models/Brand'
import getRgbTotal from '../utils/getRgbTotal'

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

const sendGmail = (mail) => {
  const { to, toSubject, toBody, fromSubject, fromBody } = mail
  return Brand.findOne({})
  .then(brand => {
    if (!brand) return Promise.reject('No brand found')
    const {
      appBar: {
        values: {
          color: appBarColor,
          fontFamily,
          fontSize,
          fontWeight,
          letterSpacing
        }
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
      },
      palette: {
        values: { primary1Color }
      },
      typography: {
        values: {
          fontFamily: textFont
        }
      }
    } = brand
    const color = getRgbTotal(appBarColor) > 600 ? primary1Color : appBarColor

    const emailTemplate = (body) => (`
    <!doctype html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css?family=Dancing+Script|Open+Sans+Condensed:300" rel="stylesheet">
    <style type="text/css">
      p, div, ol {
        font-family: ${textFont};
      }
      a {
        text-decoration: none;
        color: inherit;
        font-family: ${textFont};
      }
    </style>
    </head>
    <body>
       <main>
        ${body}
        <br/><br/>
        ${image && image.src ? `<img src=${image.src} alt="item" height="64px" width="auto"/>` : ''}
        <div>
          <span
            style="text-decoration: none; color: ${color}; font-family: ${fontFamily}; font-size: ${fontSize}; font-weight: ${fontWeight}; letter-spacing: ${letterSpacing};"
          >
            ${name}
          </span>
        </div>
        <div>
          <a
            href="mailto:${process.env.GMAIL_USER}"
            style="text-decoration: none; color: ${primary1Color};"
            >
            ${process.env.GMAIL_USER}
          </a>
        </div>
        ${phone ? `
          <div style="font-family: ${textFont}">
            <a href="tel:${phone.replace(/\D+/g, '')}" style="text-decoration: none; color: inherit;">
              ${phone}
            </div>
        ` : '' }
        ${street ? `<div style="font-family: ${textFont}">${street}</div>` : '' }
        ${zip ? `<div style="font-family: ${textFont}">${city} ${state}, ${zip}</div>` : '' }
       </main>
    </body>
    </html>
    `)

    const userMail = {
      from: process.env.GMAIL_USER,
      to: to,
      subject: toSubject,
      html: emailTemplate(toBody)
    }
    if (fromSubject) {
      const adminMail = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: fromSubject,
        html: emailTemplate(fromBody)
      }
      transporter.sendMail(adminMail)
    }
    return transporter.sendMail(userMail)
    .then(info => info)
    .catch(error => Promise.reject(error))
  })
  .catch(error => Promise.reject(error))
}

export default sendGmail
