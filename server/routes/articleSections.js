import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/articleSection'

const articleSections = express.Router()

articleSections.post('/', authenticate(['admin']), add)
articleSections.patch('/:_id', authenticate(['admin']), update)
articleSections.delete('/:_id', authenticate(['admin']), remove)

export default articleSections
