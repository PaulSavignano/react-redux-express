import express from 'express'
import { ObjectID } from 'mongodb'
import UserModel from './UserModel'

import { authenticate } from '../../middleware/authenticate'

const usersRouter = express.Router()

// Sign up
usersRouter.post('/signup', (req, res) => {
  let { email, password } = req.body
  const user = new UserModel({ email, password })
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

usersRouter.get('/me', authenticate, (req, res) => {
  const tokenToCheck = req.user.tokens.find(t => t.token === req.token)
  if ((Date.now() - tokenToCheck.createdAt) > 300000) {
    console.log('older than a minute')
    req.user.removeToken(req.token)
      .then(() => {
        res.status(200).send()
      })
      .catch(err => res.status(400).send(err))
  } else {
    console.log('under a minute still valid')
    res.send({ token: 'valid'})
  }
})

// Signin
usersRouter.post('/signin', (req, res) => {
  const { email, password } = req.body
  UserModel.findByCredentials(email, password)
    .then(user => {
      return user.generateAuthToken()
        .then(token => res.header('x-auth', token).send(user))
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Signout
usersRouter.delete('/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send()
    })
    .catch((err) => res.status(400).send(err))
})

export default usersRouter
