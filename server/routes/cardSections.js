import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove
} from '../controllers/cardSection'

const cardSections = express.Router()

cardSections.post('/', authenticate(['admin']), add)
cardSections.patch('/:_id', authenticate(['admin']), update)
cardSections.delete('/:_id', authenticate(['admin']), remove)

export default cardSections
