import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  get,
  update,
  remove,
} from '../controllers/config'

const users = express.Router()

users.post('/', authenticate([ 'owner' ]), add)
users.get('/', authenticate([ 'owner' ]), get)
users.patch('/', authenticate([ 'owner' ]), update)
users.delete('/', authenticate([ 'owner' ]), remove)

export default users
