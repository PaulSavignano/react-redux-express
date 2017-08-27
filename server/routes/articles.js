import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/article'

const articles = express.Router()

articles.post('/', authenticate(['admin']), add)
articles.patch('/:_id', authenticate(['admin']), update)
articles.delete('/:_id', authenticate(['admin']), remove)

export default articles
