import express from 'express'

import authenticate from '../middleware/authenticate'
import { add, get, update, remove } from '../controllers/card'

const cards = express.Router()

cards.post('/', authenticate(['admin']), add)
cards.get('/', get)
cards.patch('/:_id', authenticate(['admin']), update)
cards.delete('/:_id', authenticate(['admin']), remove)

export default cards
