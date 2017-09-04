import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  get,
  update,
  remove
} from '../controllers/order'

const orders = express.Router()

orders.post('/', authenticate(['user']), add)
orders.get('/', authenticate(['user']), get)
orders.patch('/:_id', authenticate(['admin']), update)

export default orders
