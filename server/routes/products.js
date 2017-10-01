import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  get,
  remove,
  update,
  updateWithImage,
  updateWithDeleteImage,
} from '../controllers/product'

const products = express.Router()

products.post('/', authenticate(['admin']), add)
products.get('/', get)
products.patch('/:_id/update-values', authenticate(['admin']), update)
products.patch('/:_id/update-with-image', authenticate(['admin']), updateWithImage)
products.patch('/:_id/update-with-delete-image', authenticate(['admin']), updateWithDeleteImage)
products.delete('/:_id', authenticate(['admin']), remove)

export default products
