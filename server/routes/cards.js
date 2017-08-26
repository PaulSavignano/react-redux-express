import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/card'

const cards = express.Router()

cards.post('/', authenticate(['admin']), add)
cards.delete('/:_id', authenticate(['admin']), remove)
cards.patch('/:_id', authenticate(['admin']), update)

export default cards
