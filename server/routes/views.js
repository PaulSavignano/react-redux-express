import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/view'

const views = express.Router()

views.post('/', authenticate(['admin']), add)
views.patch('/:_id', authenticate(['admin']), update)
views.delete('/:_id', authenticate(['admin']), remove)

export default views
