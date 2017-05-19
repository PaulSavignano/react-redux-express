import express from 'express'
import { ObjectID } from 'mongodb'
import crypto from 'crypto'

import User from '../models/User'
import authenticate from '../../middleware/authenticate'
import { sendEmail1 } from '../../middleware/nodemailer'

const users = express.Router()

// Create
users.post('/signup', (req, res) => {
  const { values } = req.body
  if (!values.firstname || !values.email || !values.password) {
    return res.status(422).send({ error: 'You must provide all fields' });
  }
  const user = new User({
    password: values.password,
    values
  })
  user.save()
    .then((doc) => {
      return user.generateAuthToken()
        .then(token => {
          sendEmail1({
            to: doc.values.email,
            subject: `Welcome to ${process.env.APP_NAME}`,
            name: doc.values.firstname,
            body: `<p>Welcome to ${process.env.APP_NAME}!</p>`
          })
          res.header('x-auth', token).send({
            roles: doc.roles,
            values: doc.values
          })
        })
    })
    .catch(err => res.status(400).send({ error: { email: 'Email is already in use' }}))
})


users.post('/signin', (req, res) => {
  const { email, password } = req.body
  User.findByCredentials(email, password)
    .then(user => {
      console.log('inside signin', user)
      if (!user) return Promise.reject({ error: { password: 'Password does not match.'}})
      return user.generateAuthToken()
        .then(token => {
          res.header('x-auth', token).send({
            roles: user.roles,
            values: user.values
          })
        })
        .catch(err => res.status(400).send(err))
    })
    .catch(err => res.status(400).send(err))
})

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
          user.passwordResetToken = token
          user.passwordResetExpires = Date.now() + (60 * 60 * 1000)
          user.save()
            .then(() => {
              sendEmail1({
                to: 'paul.savignano@gmail.com',
                subject: 'Reset Password',
                name: 'Paul',
                body: `<p>Click the link below to recover your password.<br />http://localhost:3000/reset/${token}</p>`
              })
              res.send({ message: `A password recovery email has been sent to ${user.email}`})
            })
            .catch(err => res.send(err))
        })
        .catch(err => res.status(400).send(err))
    })
})




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
          res.header('x-auth', token).send({
            roles: user.roles,
            values: user.values
          })
        })
        .catch(err => res.send({ error: { token: err }}))
    })
    .catch(err => res.status(400).send(err))
})



// Signout
users.delete('/signout', authenticate([ 'user' ]), (req, res) => {
  req.user.removeToken(req.token)
    .then(() => res.status(200).send())
    .catch(err => res.send({ error: { token: err }}))
})

// Signout
users.delete('/delete', authenticate([ 'user', 'admin' ]), (req, res) => {
  User.findOneAndRemove({ _id: req.user._id })
    .then(doc => res.send(doc))
    .catch(err => res.send({ error: err }))
})



// Get
users.get('/', authenticate(['user','admin']), (req, res) => {
  const now = Date.now()
  const ttl = 30000000
  if ((now - req.token.createdAt) > ttl) {
    return Promise.reject({ error: { token: 'Token has expired'}})
  }
  const tokens = req.user.tokens.find(token => {
    return (now - token.createdAt) > ttl
  })
  if (tokens) {
    req.user.removeTokens(tokens.token)
      .then(() => {
        res.send({ token: 'invalid'})
      })
      .catch(err => res.send({ error: err }))
  } else {
    res.send({ token: 'valid', roles: req.user.roles, values: req.user.values })
  }
})


// Contact
users.post('/contact', (req, res) => {
  const { firstname, email, message } = req.body
  if (!firstname || !email || !message) {
    return res.status(422).send({ error: 'You must provide all fields' });
  }
  sendEmail1({
    to: 'paul.savignano@gmail.com',
    subject: 'Thank you for contacting us',
    name: firstname,
    body: `<p>Your message has been recieved and we will be contacting you shortly.</p>`
  })
    .then(info => {
      res.send({ message: 'Thank you for contacting us, we will respond to you shortly!'})
    })
    .catch(err => res.send({ error: err }))
})


export default users
