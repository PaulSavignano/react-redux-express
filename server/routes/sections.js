import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update,
  updateWithImage,
  updateWithDeleteImage,
} from '../controllers/section'

const sections = express.Router()

sections.post('/', authenticate(['admin']), add)
sections.patch('/:_id/update-values', authenticate(['admin']), update)
sections.patch('/:_id/update-with-image', authenticate(['admin']), updateWithImage)
sections.patch('/:_id/update-with-delete-image', authenticate(['admin']), updateWithDeleteImage)
sections.delete('/:_id', authenticate(['admin']), remove)

export default sections
