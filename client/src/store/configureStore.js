import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { reducer as formReducer } from 'redux-form'

import cards from '../cards/reducers/index'
import cart from '../carts/reducers/index'
import carousels from '../carousels/reducers/index'
import sections from '../sections/reducers/index'
import orders from '../orders/reducers/index'
import pages from '../pages/reducers/index'
import { searchProducts, products } from '../products/reducers/index'
import { search } from '../header/reducers/search'
import brand from '../brand/reducers/index'
import user from '../users/reducers/index'

const rootReducer = combineReducers({
  brand,
  cards,
  carousels,
  cart,
  form: formReducer,
  sections,
  orders,
  pages,
  products,
  routing: routerReducer,
  search,
  searchProducts,
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
