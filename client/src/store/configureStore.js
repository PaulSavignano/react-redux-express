import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { reducer as formReducer } from 'redux-form'

import articles from '../reducers/articles'
import brand from '../reducers/brand'
import cards from '../reducers/cards'
import carts from '../reducers/carts'
import carousels from '../reducers/carousels'
import drawer from '../reducers/drawer'
import heros from '../reducers/heros'
import orders from '../reducers/orders'
import pages from '../reducers/pages'
import products from '../reducers/products'
import search from '../reducers/search'
import sections from '../reducers/sections'
import user from '../reducers/users'

const rootReducer = combineReducers({
  articles,
  brand,
  cards,
  carts,
  carousels,
  drawer,
  form: formReducer,
  heros,
  orders,
  pages,
  products,
  routing: routerReducer,
  search,
  sections,
  user,
})

const middleware = routerMiddleware(browserHistory)

const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}

export default configureStore
