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
import {
  adminAdd,
  adminRemove,
  adminUpdate,
} from '../controllers/userAdmin'

const users = express.Router()

users.post('/', add)
users.get('/', authenticate([ 'user', 'admin', 'owner' ]), get)
users.patch('/', authenticate([ 'user', 'admin', 'owner' ]), update)
users.delete('/', authenticate([ 'user', 'admin', 'owner' ]), remove)
users.post('/signin', signin)
users.post('/recovery', recovery)
users.post('/reset/:token', reset)

users.post('/contact', contact)
users.post('/request-estimate', requestEstimate)

users.post('/admin', authenticate([ 'owner' ]), adminAdd)
users.patch('/admin/:_id', authenticate([ 'owner']), adminUpdate)
users.delete('/admin/:_id', authenticate([ 'owner' ]), adminRemove)

export default users
