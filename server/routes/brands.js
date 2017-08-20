import express from 'express'

import authenticate from '../middleware/authenticate'
import {
  add,
  get,
  getId,
  updateAppBar,
  updateArticle,
  updateBusiness,
  updateBody,
  updateCard,
  updateFooter,
  updateHero,
  updateTheme,
  remove
} from '../controllers/brand'

const brands = express.Router()

brands.post('/', authenticate(['admin']), add)
brands.get('/', get)
brands.get('/:_id', getId)
brands.patch('/appbar/:_id', authenticate(['admin']), updateAppBar)
brands.patch('/article/:_id', authenticate(['admin']), updateArticle)
brands.patch('/business/:_id', authenticate(['admin']), updateBusiness)
brands.patch('/body/:_id', authenticate(['admin']), updateBody)
brands.patch('/card/:_id', authenticate(['admin']), updateCard)
brands.patch('/footer/:_id', authenticate(['admin']), updateFooter)
brands.patch('/hero/:_id', authenticate(['admin']), updateHero)
brands.patch('/theme/:_id', authenticate(['admin']), updateTheme)
brands.delete('/:_id', authenticate(['admin']), remove)

export default brands
