import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update,
  updateWithImage,
  updateWithDeleteImage,
} from '../controllers/article'

const articles = express.Router()

articles.post('/', authenticate(['admin']), add)
articles.patch('/:_id/update-values', authenticate(['admin']), update)
articles.patch('/:_id/update-with-image', authenticate(['admin']), updateWithImage)
articles.patch('/:_id/update-with-delete-image', authenticate(['admin']), updateWithDeleteImage)

articles.delete('/:_id', authenticate(['admin']), remove)

export default articles
