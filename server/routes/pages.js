import express from 'express'

import authenticate from '../middleware/authenticate'
import { add, get, update, remove } from '../controllers/page'

const pages = express.Router()

pages.post('/', authenticate(['admin']), add)
pages.get('/', get)
pages.patch('/:_id', authenticate(['admin']), update)
pages.delete('/:_id', authenticate(['admin']), remove)

export default pages
