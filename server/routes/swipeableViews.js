import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/swipeableView'

const swipeableViews = express.Router()

swipeableViews.post('/', authenticate(['admin']), add)
swipeableViews.patch('/:_id', authenticate(['admin']), update)
swipeableViews.delete('/:_id', authenticate(['admin']), remove)

export default swipeableViews
