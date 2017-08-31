import express from 'express'

import authenticate from '../middleware/authenticate'
import { add, getId, update, remove } from '../controllers/cart'

const carts = express.Router()

carts.post('/', add)
carts.get('/:_id', getId)
carts.patch('/:_id', update)
carts.delete('/:_id', remove)

export default carts
