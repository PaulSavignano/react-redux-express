import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  get,
  getAdmin,
  update,
  remove
} from '../controllers/order'

const orders = express.Router()

orders.post('/', authenticate(['user']), add)
orders.get('/', authenticate(['user']), get)
orders.get('/admin', authenticate(['admin', 'owner']), getAdmin)
orders.patch('/:_id', authenticate(['admin']), update)

export default orders
