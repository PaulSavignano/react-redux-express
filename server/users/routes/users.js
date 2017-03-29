import express from 'express'
import { ObjectID } from 'mongodb'
import User from '../models/User'

import { authenticate } from '../../middleware/authenticate'
import { emailSend } from '../../middleware/nodemailer'

const users = express.Router()

// Sign up
users.post('/signup', (req, res) => {
  let { email, password } = req.body
  const user = new User({ email, password })
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


// Signin
users.post('/signin', (req, res) => {
  const { email, password } = req.body
  const mail = {
    to: 'paul.savignano@gmail.com',
    subject: 'Welcome to our store!',
    name: 'Paul'
  }
  emailSend(mail)
  User.findByCredentials(email, password)
    .then(user => {
      return user.generateAuthToken()
        .then(token => res.header('x-auth', token).send(user))
    })
    .catch(err => {
      res.status(400).send(err)
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
    res.send({ token: 'valid', roles: req.user.roles })
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
