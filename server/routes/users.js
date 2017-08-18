import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  get,
  update,
  remove,
  signin,
  recovery,
  reset,
  signout,
  contact,
  requestEstimate
} from '../controllers/user'

const users = express.Router()

users.post('/', add)
users.get('/', authenticate(['user','admin']), get)
users.patch('/', authenticate(['user', 'admin']), update)
users.delete('/', authenticate([ 'user', 'admin' ]), remove)
users.post('/signin', signin)
users.post('/recovery', recovery)
users.post('/reset/:token', reset)
users.patch('/signout', authenticate(['admin','user']), signout)
users.post('/contact', contact)
users.post('/request-estimate', requestEstimate)

export default users
