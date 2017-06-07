import express from 'express'
import { ObjectID } from 'mongodb'
import crypto from 'crypto'
import fetch from 'node-fetch'

import User from '../models/User'
import authenticate from '../../middleware/authenticate'
import { sendEmail1 } from '../../middleware/nodemailer'

const users = express.Router()



// Create User
users.post('/', (req, res) => {
  const { email, firstName, lastName, password } = req.body
  if ( !email || !firstName || !firstName || !password) {
    return res.status(422).send({ error: 'You must provide all fields' });
  }
  const user = new User({ password, values: { email, firstName, lastName }})
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
        .catch(err => res.status(400).send())
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: { email: 'Email is already in use' }})
    })
})



// Read
users.get('/', authenticate(['user','admin']), (req, res) => {
  const { token, user } = req
  const { values, addresses, roles } = user
  const now = Date.now()
  const ttl = 30000000
  if ((now - token.createdAt) > ttl) {
    return Promise.reject({ error: { token: 'Token has expired'}})
  }
  const tokens = user.tokens.find(token => (now - token.createdAt) > ttl)
  if (tokens) {
    user.removeTokens(tokens.token)
      .then(() => {
        res.send({ token: 'invalid'})
      })
      .catch(err => res.state(400).send({ error: err }))
  } else {
    res.send({ token: 'valid', values, addresses, roles })
  }
})



// Update
users.patch('/', authenticate(['user', 'admin']), (req, res) => {
  const { user } = req
  const { type, _id, values } = req.body
  const { firstName, lastName, email, phone, password } = values
  switch (type) {

    case 'UPDATE_VALUES':
      if (password) {
        user.password = password
      }
      user.values = { firstName, lastName, email, phone }
      user.save()
        .then(() => user.generateAuthToken())
        .then(token => {
          const { values } = user
          res.header('x-auth', token).send({ values })
        })
        .catch(err => {
          console.log(err)
          res.send({ error: { token: err }})
        })
      break

    case 'ADD_ADDRESS':
      User.findOneAndUpdate({ _id: req.user._id }, { $push: { addresses: { values } }}, { new: true })
        .then(doc => {
          const { values, addresses, roles } = doc
          res.send({ addresses })
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
      .catch(err => {
        console.log(err)
        res.status(400).send(err)
      })
      break

    case 'UPDATE_ADDRESS':
      User.findOneAndUpdate({ _id: req.user._id, 'addresses._id': _id }, { $set: { 'addresss.$.values': values }}, { new: true })
        .then(doc => {
          const { addresses } = doc
          res.send({ addresses })
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
      break

    case 'DELETE_ADDRESS':
      User.findOneAndUpdate({ _id: req.user._id, 'addresses._id': _id }, { $pull: { 'addresses': { _id } }}, { new: true })
        .then(doc => {
          const { values, addresses, roles } = doc
          res.send({ addresses })
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
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
    .catch(err => res.send({ error: err }))
})










// Signin
users.post('/signin', (req, res) => {
  const { email, password } = req.body
  User.findByCredentials(email, password)
    .then(user => {
      if (!user) return Promise.reject({ error: { password: 'Password does not match.'}})
      return user.generateAuthToken()
        .then(token => {
          const { values, roles, addresses } = user
          res.header('x-auth', token).send({ values, roles, addresses })
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
    })
    .catch(err => {
      console.log(err)
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
              console.log(err)
              res.send(err)
            })
        })
        .catch(err => res.status(400).send(err))
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
        .catch(err => res.send({ error: { token: err }}))
    })
    .catch(err => res.status(400).send(err))
})



// Signout
users.patch('/signout', authenticate(['admin','user']), (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send()
    })
    .catch(err => res.send({ error: { token: err }}))
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
      console.log(err)
      res.status(400).send(err)
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
        console.log(err)
        res.send({ error: err })
      })
  })
  .catch(err => {
    console.log(err)
    res.status(400).send({ error: err })
  })
})



export default users
