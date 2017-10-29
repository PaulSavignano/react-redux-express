import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  get,
  update,
  updateWithBackgroundImage,
  updateWithDeleteBackgroundImage,
  remove
} from '../controllers/page'

const pages = express.Router()

pages.post('/', authenticate(['admin']), add)
pages.get('/', get)
pages.patch('/:_id/update-values', authenticate(['admin']), update)
pages.patch('/:_id/update-with-background-image', authenticate(['admin']), updateWithBackgroundImage)
pages.patch('/:_id/update-with-delete-background-image', authenticate(['admin']), updateWithDeleteBackgroundImage)
pages.delete('/:_id', authenticate(['admin']), remove)

export default pages
