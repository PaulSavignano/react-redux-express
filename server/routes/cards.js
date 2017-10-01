import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update,
  updateWithImage,
  updateWithDeleteImage,
} from '../controllers/card'

const cards = express.Router()

cards.post('/', authenticate(['admin']), add)
cards.delete('/:_id', authenticate(['admin']), remove)
cards.patch('/:_id/update-values', authenticate(['admin']), update)
cards.patch('/:_id/update-with-image', authenticate(['admin']), updateWithImage)
cards.patch('/:_id/update-with-delete-image', authenticate(['admin']), updateWithDeleteImage)

export default cards
