import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/section'

const sections = express.Router()

sections.post('/', authenticate(['admin']), add)
sections.patch('/:_id', authenticate(['admin']), update)
sections.delete('/:_id', authenticate(['admin']), remove)

export default sections
