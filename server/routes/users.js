import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  adminAdd,
  adminRemove,
  adminUpdate,
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
users.post('/admin', adminAdd)
users.get('/', authenticate([ 'user', 'admin', 'owner' ]), get)
users.patch('/', authenticate([ 'user', 'admin', 'owner' ]), update)
users.patch('/admin/:_id', authenticate([ 'owner']), adminUpdate)
users.delete('/', authenticate([ 'user', 'admin', 'owner' ]), remove)
users.delete('/admin/:_id', authenticate([ 'owner' ]), adminRemove)
users.post('/signin', signin)
users.post('/recovery', recovery)
users.post('/reset/:token', reset)
users.patch('/signout', authenticate([ 'admin', 'user', 'owner' ]), signout)
users.post('/contact', contact)
users.post('/request-estimate', requestEstimate)

export default users
