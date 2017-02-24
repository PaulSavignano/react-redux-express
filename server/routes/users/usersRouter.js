import express from 'express'
import { ObjectID } from 'mongodb'
import UserModel from './UserModel'

const usersRouter = express.Router()

usersRouter.post('/', (req, res) => {
  const { body } = req
  const user = new UserModel(body)
  user.save()
    .then(user => res.send(user))
    .catch(err => res.status(400).send(err))
})

export default usersRouter
