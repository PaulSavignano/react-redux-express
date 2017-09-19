import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'

import brand from '../reducers/brand'
import carts from '../reducers/carts'
import drawer from '../reducers/drawer'
import editItem from '../reducers/editItem'
import orders from '../reducers/orders'
import pages from '../reducers/pages'
import products from '../reducers/products'
import search from '../reducers/search'
import swipeables from '../reducers/swipeables'
import user from '../reducers/user'
import users from '../reducers/users'

const rootReducer = combineReducers({
  brand,
  carts,
  drawer,
  editItem,
  form: reduxForm,
  orders,
  pages,
  products,
  search,
  swipeables,
  user,
  users
})

export default rootReducer
