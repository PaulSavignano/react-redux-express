import { ObjectID } from 'mongodb'
import crypto from 'crypto'
import fetch from 'node-fetch'

import User from '../models/User'
import { sendEmail1 } from '../middleware/nodemailer'


export const add = (req, res) => {
  const { email, firstName, lastName, password } = req.body
  if ( !email || !firstName || !firstName || !password) {
    return res.status(422).send({ error: 'You must provide all fields' });
  }
  const user = new User({
    password,
    values: { email, firstName, lastName }
  })
  user.save()
    .then(doc => {
      const { values, roles } = doc
      const { email, firstName, lastName } = values
      return user.generateAuthToken()
        .then(token => {
          sendEmail1({
            to: email,
            toSubject: `Welcome to ${process.env.APP_NAME}!`,
            toBody: `
              <p>Hi ${firstName},</p>
              <p>Thank you for joining ${process.env.APP_NAME}!</p>
              <p>I hope you enjoy our offerings.  You may modify your profile settings at ${process.env.ROOT_URL}/user/profile.</p>
              <p>Please let us know if there is anything we can do to better assist you.</p>
            `,
            fromSubject: `New ${process.env.APP_NAME} user!`,
            fromBody: `
              <p>New user ${firstName} ${lastName} just signed up at ${process.env.APP_NAME}.</p>
              `
          })
          res.header('x-auth', token).send({ values, roles })
        })
        .catch(error => {
          console.error('generateAuthToken(): ', error)
          res.status(400).send({ error: { password: 'password not valid' }})
        })
    })
    .catch(error => {
      console.error('user.save() : ', error)
      res.status(400).send({ error: { email: 'User already exists'}})
    })
}


export const get = (req, res) => {
  const { token, user } = req
  const { values, addresses, roles } = user
  const ttl = (1000 * 60 * 60 * 24)
  const expiredTokens = user.tokens.filter(token => (token.createdAt + ttl) < Date.now())
  if (expiredTokens.length) {
    user.removeTokens(expiredTokens)
      .then(() => {
        res.status(400).send({ error: 'Your token has expired, please sign in again' })
      })
      .catch(error => {
        console.error('removeTokens() error :', error)
        res.status(401).send({ error })
      })
  } else {
    res.send({ token: 'valid', values, addresses, roles })
  }
}


export const update = (req, res) => {
  const { user } = req
  const { type, itemId, values } = req.body
  switch (type) {

    case 'UPDATE_VALUES':
      if (values.password) {
        user.password = values.password
      }
      user.values = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone
      }
      user.save()
        .then(() => user.generateAuthToken())
        .then(token => {
          const { values } = user
          res.header('x-auth', token).send({ values })
        })
        .catch(error => {
          console.error('user.save(): ', error)
          res.status(400).send({ error: { password: error }})
        })
      break

    case 'ADD_ADDRESS':
      User.findOneAndUpdate({ _id: req.user._id }, { $push: { addresses: { values } }}, { new: true })
        .then(doc => {
          const { values, addresses, roles } = doc
          res.send({ addresses })
        })
        .catch(error => {
          console.error('User.findOneAndUpdate: ', error)
          res.status(400).send({ error: { address: 'Update failed' }})
        })
      break

    case 'UPDATE_ADDRESS':
      User.findOneAndUpdate({ _id: req.user._id, 'addresses._id': itemId }, { $set: { 'addresses.$.values': values }}, { new: true })
        .then(doc => {
          const { addresses } = doc
          res.send({ addresses })
        })
        .catch(error => {
          console.error('User.findOneAndUpdate: ', error)
          res.status(400).send({ error: 'Address update failed'})
        })
      break

    case 'DELETE_ADDRESS':
      User.findOneAndUpdate({ _id: req.user._id, 'addresses._id': itemId }, { $pull: { 'addresses': { _id: itemId } }}, { new: true })
        .then(doc => {
          const { values, addresses, roles } = doc
          res.send({ addresses })
        })
        .catch(error => {
          console.error('User.findOneAndUpdate: ', error)
          res.status(400).send({ error: 'Address delete failed' })
        })
      break

    default:
      return
  }
}


export const remove = (req, res) => {
  User.findOneAndRemove(
    { _id: req.user._id }
  )
  .then(doc => res.status(200).send())
  .catch(error => {
    console.error('User.findOneAndRemove: ', error)
    res.status(400).send({ error: 'user delete failed' })
  })
}


export const signin = (req, res) => {
  const { email, password } = req.body
  User.findByCredentials(email, password)
    .then(user => {
      if (!user) return Promise.reject({ error: 'User not found' })
      return user.generateAuthToken()
        .then(token => {
          const { values, roles, addresses } = user
          res.header('x-auth', token).send({ values, roles, addresses })
        })
        .catch(error => {
          console.error('user.generateAuthToken(): ', error)
          res.status(400).send({ error })
        })
    })
    .catch(error => {
      console.error('User.findByCredentials: ', error)
      res.status(400).send({ error })
    })
}


export const recovery = (req, res, next) => {
  const { email } = req.body
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (error, buf) => {
      if (error) return reject(error)
      resolve(buf.toString('hex'));
    })
  })
    .then(token => {
      User.findOne({ 'values.email': email })
        .then(user => {
          const path = process.env.ROOT_URL ? `${process.env.ROOT_URL}user/reset/${token}` : `localhost:${process.env.PORT}/user/reset/${token}`
          if (!user) return Promise.reject({ error: { email: 'User not found' }})
          const { firstName, email } = user.values
          user.passwordResetToken = token
          user.passwordResetExpires = Date.now() + (60 * 60 * 1000)
          user.save()
            .then(() => {
              sendEmail1({
                to: email,
                toSubject: 'Reset Password',
                toBody: `
                  <p>Hi ${firstName},</p>
                  <p>Click the link below to recover your password.</p>
                  <br />
                  <a href="${path}" style="color: black; text-decoration: none;">
                    ${path}
                  </a>
                  `
              })
              res.send({ message: `A password recovery email has been sent to ${email}`})
            })
            .catch(error => {
              console.error(error)
              res.status(400).send({ error })
            })
        })
        .catch(error => {
          console.error('User.findOne: ', error)
          res.status(400).send({ error })
        })
    })
}


export const reset = (req, res) => {
  User.findOne(
    { passwordResetToken: req.params.token, passwordResetExpires: { $gt: Date.now() }}
  )
  .then(user => {
    if (!user) return Promise.reject({ error: 'Invalid token' })
    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    user.save()
      .then(() => user.generateAuthToken())
      .then(token => {
        const { values, roles, addresses } = user
        res.header('x-auth', token).send({ values, roles, addresses })
      })
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
    })
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
}



export const signout = (req, res) => {
  req.user.removeToken(req.token)
    .then(() => res.status(200).send())
    .catch(error => {
      console.error(error)
      res.status(401).send()
    })
}


export const contact = (req, res) => {
  const { email, firstName, phone, message } = req.body
  if (!firstName || !email || !message) {
    return res.status(422).send({ error: 'You must provide all fields' });
  }
  sendEmail1({
    to: email,
    toSubject: 'Thank you for contacting us!',
    name: firstName,
    toBody: `<p>Thank you for reaching out.  We will contact you shortly!</p>`,
    fromSubject: `New Contact Request`,
    fromBody: `
      <p>${firstName} just contacted you through ${process.env.APP_NAME}.</p>
      ${phone && `<div>Phone: ${phone}</div>`}
      <div>Email: ${email}</div>
      <div>Message: ${message}</div>
    `
  })
    .then(info => {
      res.send({ message: 'Thank you for contacting us, we will respond to you shortly!'})
    })
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
}


export const requestEstimate = (req, res) => {
  const { date, firstName, lastName, phone, email, from, to, size, note } = req.body
  var auth = 'Basic ' + new Buffer(process.env.MOVERBASE_KEY + ':').toString('base64')
  return fetch(`https://api.moverbase.com/v1/leads/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth
    },
    body: JSON.stringify({
     date,
     firstName,
     lastName,
     phone,
     email,
     from: { postalCode: from },
     to: { postalCode: to },
     size: { title: size },
     note
    })
  })
  .then(res => res.json())
  .then(json => {
    sendEmail1({
      to: email,
      toSubject: 'Thank you for contacting us for a free estimate',
      name: firstName,
      toBody: `<p>Thank you for requesting a free estimate.  We will contact you shortly!</p>`,
      fromSubject: `New Estimate Request`,
      fromBody: `
        <p>${firstName} just contacted you through ${process.env.APP_NAME}.</p>
        ${phone && `<div>Phone: ${phone}</div>`}
        <div>Email: ${email}</div>
        <div>Note: ${note}</div>
      `
    })
      .then(info => res.status(200).send())
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
  })
  .catch(error => {
    console.error(error)
    res.status(400).send({ error })
  })
}
