import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  addSub,
  get,
  readById,
  updateSub,
  remove,
  removeSub
} from '../controllers/carousel'

const carousels = express.Router()

// Create
carousels.post('/', authenticate(['admin']), add)
// Read
carousels.get('/', get)
// update
carousels.patch('/:carouselId/add', authenticate(['admin']), addSub)
carousels.patch('/:carouselId/update/:slideId', authenticate(['admin']), updateSub)
carousels.patch('/:carouselId/remove/:slideId', authenticate(['admin']), removeSub)
// Delete
carousels.delete('/:carouselId', authenticate(['admin']), remove)


export default carousels
