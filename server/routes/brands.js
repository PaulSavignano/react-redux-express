import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  get,
  getId,
  updateAppBar,
  updateArticleStyle,
  updateBusiness,
  updateBodyStyle,
  updateCardStyle,
  updateFooter,
  updateHeroStyle,
  updatePalette,
  updateProductStyle,
  updateTheme,
  updateTypography,
  remove
} from '../controllers/brand'

const brands = express.Router()

brands.post('/', authenticate(['admin']), add)
brands.get('/', get)
brands.get('/:_id', getId)
brands.patch('/appbar/:_id', authenticate(['admin']), updateAppBar)
brands.patch('/articlestyle/:_id', authenticate(['admin']), updateArticleStyle)
brands.patch('/business/:_id', authenticate(['admin']), updateBusiness)
brands.patch('/bodystyle/:_id', authenticate(['admin']), updateBodyStyle)
brands.patch('/cardstyle/:_id', authenticate(['admin']), updateCardStyle)
brands.patch('/footer/:_id', authenticate(['admin']), updateFooter)
brands.patch('/herostyle/:_id', authenticate(['admin']), updateHeroStyle)
brands.patch('/palette/:_id', authenticate(['admin']), updatePalette)
brands.patch('/productstyle/:_id', authenticate(['admin']), updateProductStyle)
brands.patch('/theme/:_id', authenticate(['admin']), updateTheme)
brands.patch('/typography/:_id', authenticate(['admin']), updateTypography)
brands.delete('/:_id', authenticate(['admin']), remove)

export default brands
