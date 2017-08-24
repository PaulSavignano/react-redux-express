import express from 'express'

import authenticate from '../middleware/authenticate'
import { add, get, getId, update, remove } from '../controllers/section'

const sections = express.Router()

sections.post('/', authenticate(['admin']), add)
sections.get('/', get)
sections.patch('/:_id', authenticate(['admin']), update)
sections.delete('/:pageId/:sectionId', authenticate(['admin']), remove)

export default sections
