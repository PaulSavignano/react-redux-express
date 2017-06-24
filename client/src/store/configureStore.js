import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { reducer as formReducer } from 'redux-form'

import brand from '../brand/reducers/index'
import cards from '../cards/reducers/index'
import cart from '../carts/reducers/index'
import orders from '../orders/reducers/index'
import pages from '../pages/reducers/index'
import products from '../products/reducers/index'
import search from '../search/reducers/index'
import sections from '../sections/reducers/index'
import slides from '../slides/reducers/index'
import user from '../users/reducers/index'

const rootReducer = combineReducers({
  brand,
  cards,
  cart,
  form: formReducer,
  orders,
  pages,
  products,
  routing: routerReducer,
  search,
  sections,
  slides,
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
