import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { reducer as formReducer } from 'redux-form'

import cards from '../cards/reducers/index'
import carousels from '../carousels/reducers/index'
import cart from '../products/reducers/cart'
import sections from '../sections/reducers/index'
import orders from '../products/reducers/orders'
import pages from '../pages/reducers/index'
import { searchProducts, products } from '../products/reducers/products'
import { search } from '../header/reducers/search'
import { searchTodos, showCompleted, todos } from '../todos/reducers/todos'
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
  searchTodos,
  showCompleted,
  theme,
  todos,
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
