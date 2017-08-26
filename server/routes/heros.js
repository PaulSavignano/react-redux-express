import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update
} from '../controllers/hero'

const heros = express.Router()

heros.post('/', authenticate(['admin']), add)
heros.delete('/:_id', authenticate(['admin']), remove)
heros.patch('/:_id', authenticate(['admin']), update)

export default heros
