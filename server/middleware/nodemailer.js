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

export const emailSend = (mail) => {
  console.log(mail)
  const { to, subject, name } = mail
  const mailOptions = {
      from: ''+process.env.GMAIL_USER+'',
      to: ''+to+'',
      subject: 'Testing 123',
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f2f2f2" style="margin:0 auto;background-color:#f2f2f2">
          <tbody>
            <tr style="padding:10px 20px 0 20px">Hello ${name}!</tr>
            <tr>Welcome to our store!</tr>
          </tbody>
        </table>
      `
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      return res.send(error);
    }
    return res.send("mail send successfully")
  })
}
