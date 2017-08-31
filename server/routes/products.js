import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  get,
  remove,
  update
} from '../controllers/product'

const products = express.Router()

products.post('/', authenticate(['admin']), add)
products.get('/', get)
products.patch('/:_id', authenticate(['admin']), update)
products.delete('/:_id', authenticate(['admin']), remove)

export default products
