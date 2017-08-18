import express from 'express'

import authenticate from '../middleware/authenticate'
import { add, getId, update, remove } from '../controllers/cart'

const carts = express.Router()

carts.post('/', authenticate(['admin']), add)
carts.get('/', getId)
carts.patch('/:_id', authenticate(['admin']), update)
carts.delete('/:_id', authenticate(['admin']), remove)

export default carts
