import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/swipeableSection'

const swipeableSections = express.Router()

swipeableSections.post('/', authenticate(['admin']), add)
swipeableSections.patch('/:_id', authenticate(['admin']), update)
swipeableSections.delete('/:_id', authenticate(['admin']), remove)

export default swipeableSections
