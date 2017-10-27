import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  get,
  getId,
  updateAppBarValues,
  updateAppBarWithImage,
  updateAppBarWithDeleteImage,
  updateArticleStyle,
  updateBusinessValues,
  updateBusinessWithImage,
  updateBusinessWithDeleteImage,
  updateBodyValues,
  updateBodyWithBackgroundImage,
  updateBodyWithDeleteBackgroundImage,
  updateCardStyle,
  updateFooterWithImageAndBackgroundImage,
  updateFooterWithImageAndDeleteBackgroundImage,
  updateFooterWithBackgroundImageAndDeleteImage,
  updateFooterWithDeleteImageAndDeleteBackgroundImage,
  updateFooterWithImage,
  updateFooterWithBackgroundImage,
  updateFooterWithDeleteImage,
  updateFooterWithDeleteBackgroundImage,
  updateFooterValues,
  updateHeroStyle,
  updatePalette,
  updateProductStyle,
  updateTypography,
  remove
} from '../controllers/brand'

const brands = express.Router()

brands.post('/', authenticate(['admin']), add)
brands.get('/', get)
brands.get('/:_id', getId)

brands.patch('/:_id/appbar/update-values', authenticate(['admin']), updateAppBarValues)
brands.patch('/:_id/appbar/update-with-image', authenticate(['admin']), updateAppBarWithImage)
brands.patch('/:_id/appbar/update-with-delete-image', authenticate(['admin']), updateAppBarWithDeleteImage)

brands.patch('/:_id/articlestyle', authenticate(['admin']), updateArticleStyle)

brands.patch('/:_id/business/update-values', authenticate(['admin']), updateBusinessValues)
brands.patch('/:_id/business/update-with-image', authenticate(['admin']), updateBusinessWithImage)
brands.patch('/:_id/business/update-with-delete-image', authenticate(['admin']), updateBusinessWithDeleteImage)


brands.patch('/:_id/body/update-values', authenticate(['admin']), updateBodyValues)
brands.patch('/:_id/body/update-with-background-image', authenticate(['admin']), updateBodyWithBackgroundImage)
brands.patch('/:_id/body/update-with-delete-background-image', authenticate(['admin']), updateBodyWithDeleteBackgroundImage)


brands.patch('/:_id/cardstyle', authenticate(['admin']), updateCardStyle)

brands.patch('/:_id/footer/update-with-image-and-background-image', authenticate(['admin']), updateFooterWithImageAndBackgroundImage)
brands.patch('/:_id/footer/update-with-image-and-delete-background-image', authenticate(['admin']), updateFooterWithImageAndDeleteBackgroundImage)
brands.patch('/:_id/footer/update-with-background-image-and-delete-image', authenticate(['admin']), updateFooterWithBackgroundImageAndDeleteImage)
brands.patch('/:_id/footer/update-with-delete-image-and-delete-background-image', authenticate(['admin']), updateFooterWithDeleteImageAndDeleteBackgroundImage)
brands.patch('/:_id/footer/update-with-image', authenticate(['admin']), updateFooterWithImage)
brands.patch('/:_id/footer/update-with-background-image', authenticate(['admin']), updateFooterWithBackgroundImage)
brands.patch('/:_id/footer/update-with-delete-image', authenticate(['admin']), updateFooterWithDeleteImage)
brands.patch('/:_id/footer/update-with-delete-background-image', authenticate(['admin']), updateFooterWithDeleteBackgroundImage)
brands.patch('/:_id/footer/update-values', authenticate(['admin']), updateFooterValues)

brands.patch('/:_id/herostyle', authenticate(['admin']), updateHeroStyle)
brands.patch('/:_id/palette', authenticate(['admin']), updatePalette)
brands.patch('/:_id/productstyle', authenticate(['admin']), updateProductStyle)
brands.patch('/:_id/typography', authenticate(['admin']), updateTypography)
brands.delete('/:_id', authenticate(['admin']), remove)

export default brands
