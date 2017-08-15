import express from 'express'

import authenticate from '../middleware/authenticate'
import { create, read, update, remove } from '../controllers/slideController'

const slides = express.Router()

// Create
slides.post('/', authenticate(['admin']), create)
// Read
slides.get('/', read)
// Update
slides.patch('/:_id', authenticate(['admin']), update)
// Delete
slides.delete('/:_id', authenticate(['admin']), remove)



export default slides
