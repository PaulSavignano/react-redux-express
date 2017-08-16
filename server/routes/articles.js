import express from 'express'

import authenticate from '../middleware/authenticate'
import { add, get, update, remove } from '../controllers/article'

const articles = express.Router()

articles.post('/', authenticate(['admin']), add)
articles.get('/', get)
articles.patch('/:_id', authenticate(['admin']), update)
articles.delete('/:_id', authenticate(['admin']), remove)

export default articles
