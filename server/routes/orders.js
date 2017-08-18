import express from 'express'

import authenticate from '../middleware/authenticate'
import { add, get, update, remove } from '../controllers/order'

const orders = express.Router()

orders.post('/', authenticate(['admin']), add)
orders.get('/', authenticate(['admin']), get)
orders.patch('/:_id', authenticate(['admin']), update)

export default orders
