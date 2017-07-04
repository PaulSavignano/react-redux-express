import express from 'express'
import { ObjectID } from 'mongodb'
import crypto from 'crypto'
import fetch from 'node-fetch'

import User from '../models/User'
import authenticate from '../middleware/authenticate'
import { sendEmail1 } from '../middleware/nodemailer'

const users = express.Router()


// Create User
users.post('/', (req, res) => {
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
        .catch(err => {
          console.error('generateAuthToken(): ', err)
          res.status(400).send({ error: { password: 'password not valid' }})
        })
    })
    .catch(err => {
      console.error('user.save() : ', err)
      res.status(400).send({ error: { email: 'User already exists'}})
    })
})



// Read
users.get('/', authenticate(['user','admin']), (req, res) => {
  const { token, user } = req
  const { values, addresses, roles } = user
  const ttl = (1000 * 60 * 60 * 24)
  const expiredTokens = user.tokens.filter(token => (token.createdAt + ttl) < Date.now())
  if (expiredTokens.length) {
    user.removeTokens(expiredTokens)
      .then(() => {
        res.status(400).send({ error: { token: 'Your token has expired, please sign in again' }})
      })
      .catch(err => {
        console.error('removeTokens() error :', err)
        res.status(401).send(err)
      })
  } else {
    res.send({ token: 'valid', values, addresses, roles })
  }
})



// Update
users.patch('/', authenticate(['user', 'admin']), (req, res) => {
  const { user } = req
  console.log(req.body)
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
        .catch(err => {
          console.error('user.save(): ', err)
          res.status(400).send({ error: { password: err }})
        })
      break

    case 'ADD_ADDRESS':
      User.findOneAndUpdate({ _id: req.user._id }, { $push: { addresses: { values } }}, { new: true })
        .then(doc => {
          const { values, addresses, roles } = doc
          res.send({ addresses })
        })
        .catch(err => {
          console.error('User.findOneAndUpdate: ', err)
          res.status(400).send({ error: { address: 'Update failed' }})
        })
      break

    case 'UPDATE_ADDRESS':
      console.log('updating address')
      User.findOneAndUpdate({ _id: req.user._id, 'addresses._id': itemId }, { $set: { 'addresses.$.values': values }}, { new: true })
        .then(doc => {
          console.log('doc ', doc.addresses)
          const { addresses } = doc
          res.send({ addresses })
        })
        .catch(err => {
          console.error('User.findOneAndUpdate: ', err)
          res.status(400).send({ error: 'Address update failed'})
        })
      break

    case 'DELETE_ADDRESS':
      User.findOneAndUpdate({ _id: req.user._id, 'addresses._id': itemId }, { $pull: { 'addresses': { _id: itemId } }}, { new: true })
        .then(doc => {
          console.log(doc)
          const { values, addresses, roles } = doc
          res.send({ addresses })
        })
        .catch(err => {
          console.error('User.findOneAndUpdate: ', err)
          res.status(400).send({ error: 'Address delete failed' })
        })
      break

    default:
      return
  }
})


// Delete
users.delete('/', authenticate([ 'user', 'admin' ]), (req, res) => {
  User.findOneAndRemove({ _id: req.user._id })
    .then(doc => res.status(200).send())
    .catch(err => {
      console.error('User.findOneAndRemove: ', err)
      res.status(400).send({ error: 'user delete failed' })
    })
})










// Signin
users.post('/signin', (req, res) => {
  const { email, password } = req.body
  User.findByCredentials(email, password)
    .then(user => {
      if (!user) return Promise.reject({ error: { email: 'User not found'}})
      return user.generateAuthToken()
        .then(token => {
          const { values, roles, addresses } = user
          res.header('x-auth', token).send({ values, roles, addresses })
        })
        .catch(err => {
          console.error('user.generateAuthToken(): ', err)
          res.status(400).send(err)
        })
    })
    .catch(err => {
      console.error('User.findByCredentials: ', err)
      res.status(400).send(err)
    })
})


// Recovery
users.post('/recovery', (req, res, next) => {
  const { email } = req.body
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buf) => {
      if (err) return reject(err)
      resolve(buf.toString('hex'));
    })
  })
    .then(token => {
      User.findOne({ 'values.email': email })
        .then(user => {
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
                  <p>Click the link below to recover your password.<br />${process.env.ROOT_URL}reset/${token}</p>`
              })
              res.send({ message: `A password recovery email has been sent to ${email}`})
            })
            .catch(err => {
              console.error(err)
              res.status(400).send()
            })
        })
        .catch(err => {
          console.error('User.findOne: ', err)
          res.status(400).send(err)
        })
    })
})


// Reset
users.post('/reset/:token', (req, res) => {
  User.findOne({ passwordResetToken: req.params.token, passwordResetExpires: { $gt: Date.now() } })
    .then(user => {
      if (!user) return Promise.reject({ error: { token: 'token not valid' }})
      user.password = req.body.password
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      user.save()
        .then(() => user.generateAuthToken())
        .then(token => {
          const { values, roles, addresses } = user
          res.header('x-auth', token).send({ values, roles, addresses })
        })
        .catch(err => {
          console.error(err)
          res.status(400).send()
        })
    })
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})



// Signout
users.patch('/signout', authenticate(['admin','user']), (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send()
    })
    .catch(err => {
      console.error(err)
      res.status(401).send()
    })
})


// Contact
users.post('/contact', (req, res) => {
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
    .catch(err => {
      console.error(err)
      res.status(400).send()
    })
})







users.post('/request-estimate', (req, res) => {
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
  .then(res => {
    if (res.ok) return res.json()
    throw new Error('Network response was not ok.')
  })
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
      .then(info => {
        res.status(200).send()
      })
      .catch(err => {
        console.error(err)
        res.status(400).send()
      })
  })
  .catch(err => {
    console.error(err)
    res.status(400).send()
  })
})



export default users
