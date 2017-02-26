import express from 'express'
import { ObjectID } from 'mongodb'
import UserModel from './UserModel'

import { authenticate } from '../../middleware/authenticate'

const usersRouter = express.Router()

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

usersRouter.post('/login', (req, res) => {
  const { email, password } = req.body
  UserModel.findByCredentials(email, password)
    .then(user => {
      return user.generateAuthToken()
        .then(token => res.header('x-auth', token).send(user))
    })
    .catch(err => res.status(400).send(err))
})

export default usersRouter
