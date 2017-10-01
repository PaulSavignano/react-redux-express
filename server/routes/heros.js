import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  remove,
  update,
  updateWithImageAndBackgroundImage,
  updateWithImageAndDeleteBackgroundImage,
  updateWithBackgroundImageAndDeleteImage,
  updateWithDeleteImageAndDeleteBackgroundImage,
  updateWithImage,
  updateWithBackgroundImage,
  updateWithDeleteImage,
  updateWithDeleteBackgroundImage,
} from '../controllers/hero'

const heros = express.Router()

heros.post('/', authenticate(['admin']), add)
heros.delete('/:_id', authenticate(['admin']), remove)

heros.patch('/:_id/update-with-image-and-background-image', authenticate(['admin']), updateWithImageAndBackgroundImage)
heros.patch('/:_id/update-with-image-and-delete-background-image', authenticate(['admin']), updateWithImageAndDeleteBackgroundImage)
heros.patch('/:_id/update-with-background-image-and-delete-image', authenticate(['admin']), updateWithBackgroundImageAndDeleteImage)
heros.patch('/:_id/update-with-delete-image-and-delete-background-image', authenticate(['admin']), updateWithDeleteImageAndDeleteBackgroundImage)
heros.patch('/:_id/update-with-image', authenticate(['admin']), updateWithImage)
heros.patch('/:_id/update-with-background-image', authenticate(['admin']), updateWithBackgroundImage)
heros.patch('/:_id/update-with-delete-image', authenticate(['admin']), updateWithDeleteImage)
heros.patch('/:_id/update-with-delete-background-image', authenticate(['admin']), updateWithDeleteBackgroundImage)

heros.patch('/:_id/update-values', authenticate(['admin']), update)

export default heros
