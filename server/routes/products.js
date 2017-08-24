import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/product'

const products = express.Router()

products.post('/', authenticate(['admin']), add)
products.patch('/:_id', authenticate(['admin']), update)
products.delete('/:_id', authenticate(['admin']), remove)

export default products
