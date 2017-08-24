import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/card'

const cards = express.Router()

cards.post('/', authenticate(['admin']), add)
cards.patch('/:_id', authenticate(['admin']), update)
cards.delete('/:_id', authenticate(['admin']), remove)

export default cards
