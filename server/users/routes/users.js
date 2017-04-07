import express from 'express'
import { ObjectID } from 'mongodb'
import crypto from 'crypto'

import User from '../models/User'
import { authenticate } from '../../middleware/authenticate'
import { sendEmail1 } from '../../middleware/nodemailer'

const users = express.Router()

// Sign up
users.post('/signup', (req, res) => {
  const { firstname, lastname, email, password } = req.body
  if (!firstname || !lastname || !email || !password) {
    return res.status(422).send({ error: 'You must provide all fields' });
  }
  const user = new User({ firstname, lastname, email, password })
  user.save()
    .then((doc) => {
      console.log(doc)
      return user.generateAuthToken()
    })
    .then((token) => {
      console.log(user)
      res.header('x-auth', token).send({ name: user.firstname })
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send({ error: 'Email is already in use'})
    })
})


// Signin
users.post('/signin', (req, res) => {
  const { email, password } = req.body
  // sendEmail1({
  //   to: 'paul.savignano@gmail.com',
  //   subject: 'Welcome to our store!',
  //   body: `<p>Thank you for signing up!  I hope you enjoy our products!</p>`
  // })
  User.findByCredentials(email, password)
    .then(user => {
      return user.generateAuthToken()
        .then(token => res.header('x-auth', token).send({ user: user.firstname, roles: user.roles }))
    })
    .catch(err => {
      console.log('no user found')
      res.status(400).send(err)
    })
})

users.post('/recovery', (req, res, next) => {
  const { email } = req.body
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buf) => {
      if (err) {
        reject(err)
      } else {
        resolve(buf.toString('hex'));
      }
    });
  })
    .then(token => {
      User.findOne({ email })
        .then(user => {
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
            .catch(err => res.status(400).send(err))
        })
        .catch(err => {
          res.status(400).send({ error: 'Email not found' })
        })
      })
    .catch(err => console.log('crypto failed'))
})


users.get('/reset/:token', (req, res) => {
  User.findOne({ passwordResetToken: req.params.token, passwordResetExpires: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return Promise.reject()
      }
    })
    .catch(err => {
      res.send(400).send(err)
    })
})


users.post('/reset/:token', (req, res) => {
  User.findOne({ passwordResetToken: req.params.token, passwordResetExpires: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return Promise.reject()
      }
      user.password = req.body.password
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      user.save()
        .then(() => {
          return user.generateAuthToken()
        })
        .then((token) => {
          res.header('x-auth', token).send(user)
        })
        .catch((err) => {
          res.status(400).send(err)
        })
    })
    .catch(err => {
      res.send(400).send(err)
    })
})



// Signout
users.delete('/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send()
    })
    .catch((err) => res.status(400).send(err))
})

// Get
users.get('/me', authenticate(['user','admin']), (req, res) => {
  const now = Date.now()
  const ttl = 30000000
  if ((now - req.token.createdAt) > ttl) {
    res.status(401).send({ token: 'invalid' })
  }
  const tokens = req.user.tokens.find(token => {
    return (now - token.createdAt) > ttl
  })
  if (tokens) {
    req.user.removeTokens(tokens.token)
      .then(() => {
        res.send({ token: 'invalid'})
      })
      .catch(err => res.status(400).send(err))
  } else {
    res.send({ token: 'valid', roles: req.user.roles, name: req.user.firstname })
  }
})


// test
users.get('/admin-only-route', authenticate(['user']), (req, res) => {
  res.send(req.user)

  // req.user.role.map(role => {
  //   if (role === 'admin') {
  //     Todo.find({})
  //       .then(todos => res.send({todos}))
  //       .catch(err => res.status(400).send(err))
  //   } else {
  //     res.state(401).send()
  //   }
  // })
})


export default users
