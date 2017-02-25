import express from 'express'
import { ObjectID } from 'mongodb'
import UserModel from './UserModel'

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

export default usersRouter
