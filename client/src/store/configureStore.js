import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { reducer as formReducer } from 'redux-form'

import cards from '../cards/reducers/index'
import carousels from '../carousels/reducers/index'
import cart from '../carts/reducers/index'
import sections from '../sections/reducers/index'
import orders from '../orders/reducers/index'
import pages from '../pages/reducers/index'
import { searchProducts, products } from '../products/reducers/index'
import { search } from '../header/reducers/search'
import theme from '../theme/reducers/index'
import user from '../users/reducers/index'


const rootReducer = combineReducers({
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
  theme,
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
