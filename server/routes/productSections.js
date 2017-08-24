import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove
} from '../controllers/productSection'

const productSections = express.Router()

productSections.post('/', authenticate(['admin']), add)
productSections.patch('/:_id', authenticate(['admin']), update)
productSections.delete('/:_id', authenticate(['admin']), remove)

export default productSections
