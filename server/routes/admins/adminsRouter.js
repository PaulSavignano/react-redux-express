import express from 'express'
import { ObjectID } from 'mongodb'
import AdminModel from './AdminModel'

const adminsRouter = express.Router()

adminsRouter.post('/', (req, res) => {
  let { email, password } = req.body
  const admin = new AdminModel({ email, password })
  admin.save()
    .then(() => {
      return admin.generateAuthToken()
    })
    .then((token) => {
      res.header('x-auth', token).send(admin)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

export default adminsRouter
