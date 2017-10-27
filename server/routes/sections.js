import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update,
  updateWithBackgroundImage,
  updateWithDeleteBackgroundImage,
} from '../controllers/section'

const sections = express.Router()

sections.post('/', authenticate(['admin']), add)
sections.patch('/:_id/update-values', authenticate(['admin']), update)
sections.patch('/:_id/update-with-background-image', authenticate(['admin']), updateWithBackgroundImage)
sections.patch('/:_id/update-with-delete-background-image', authenticate(['admin']), updateWithDeleteBackgroundImage)
sections.delete('/:_id', authenticate(['admin']), remove)

export default sections
