import express from 'express'
import { ObjectID } from 'mongodb'
import UserModel from './UserModel'

import { authenticate } from '../../middleware/authenticate'

const usersRouter = express.Router()

// Create user
usersRouter.post('/', (req, res) => {
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
  res.send(req.user)
})

// Login
usersRouter.post('/login', (req, res) => {
  const { email, password } = req.body
  UserModel.findByCredentials(email, password)
    .then(user => {
      return user.generateAuthToken()
        .then(token => res.header('x-auth', token).send(user))
    })
    .catch(err => res.status(400).send(err))
})

// Logout
usersRouter.delete('/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send()
    })
    .catch((err) => res.status(400).send(err))
})

export default usersRouter
