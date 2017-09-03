import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  adminAdd,
  adminUpdate,
  adminRemove,
  get,
  remove,
  update
} from '../controllers/address'

const addresses = express.Router()

addresses.post('/', authenticate([ 'admin', 'owner', 'user' ]), add)
addresses.post('/admin/:userId', authenticate([ 'owner' ]), adminAdd)
addresses.patch('/:_id', authenticate([ 'admin', 'owner', 'user' ]), update)
addresses.patch('/admin/:_id', authenticate([ 'owner' ]), adminUpdate)
addresses.delete('/:_id', authenticate([ 'admin', 'owner', 'user' ]), remove)
addresses.delete('/admin/:_id', authenticate([ 'owner' ]), adminRemove)

export default addresses
