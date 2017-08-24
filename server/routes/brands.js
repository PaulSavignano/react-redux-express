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
  updateProductStyle,
  updateTheme,
  remove
} from '../controllers/brand'

const brands = express.Router()

brands.post('/', authenticate(['admin']), add)
brands.get('/', get)
brands.get('/:_id', getId)
brands.patch('/appbar/:_id', authenticate(['admin']), updateAppBar)
brands.patch('/article-style/:_id', authenticate(['admin']), updateArticleStyle)
brands.patch('/business/:_id', authenticate(['admin']), updateBusiness)
brands.patch('/body-style/:_id', authenticate(['admin']), updateBodyStyle)
brands.patch('/card-style/:_id', authenticate(['admin']), updateCardStyle)
brands.patch('/footer/:_id', authenticate(['admin']), updateFooter)
brands.patch('/hero-style/:_id', authenticate(['admin']), updateHeroStyle)
brands.patch('/product-style/:_id', authenticate(['admin']), updateProductStyle)
brands.patch('/theme/:_id', authenticate(['admin']), updateTheme)
brands.delete('/:_id', authenticate(['admin']), remove)

export default brands
