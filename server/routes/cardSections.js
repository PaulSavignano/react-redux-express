import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/cardSection'

const cardSections = express.Router()

cardSections.post('/', authenticate(['admin']), add)
cardSections.delete('/:_id', authenticate(['admin']), remove)
cardSections.patch('/:_id', authenticate(['admin']), update)

export default cardSections
