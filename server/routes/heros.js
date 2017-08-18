import express from 'express'

import authenticate from '../middleware/authenticate'
import { add, get, update, remove } from '../controllers/card'

const heros = express.Router()

heros.post('/', authenticate(['admin']), add)
heros.get('/', get)
heros.patch('/:_id', authenticate(['admin']), update)
heros.delete('/:_id', authenticate(['admin']), remove)

export default heros
