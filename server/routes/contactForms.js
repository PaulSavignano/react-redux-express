import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/contactForm'

const contactForm = express.Router()

contactForm.post('/', authenticate(['admin']), add)
contactForm.delete('/:_id', authenticate(['admin']), remove)
contactForm.patch('/:_id', authenticate(['admin']), update)

export default contactForm
