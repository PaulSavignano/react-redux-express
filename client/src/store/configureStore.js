import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import { reducer as formReducer } from 'redux-form'
import { searchTodos, showCompleted, todos } from '../todos/reducers/todos'
import { user } from '../users/reducers/users'
import { searchProducts, products } from '../products/reducers/products'
import { cart } from '../products/reducers/cart'
import { pages } from '../pages/reducers/page'
import { checkout } from '../products/reducers/checkout'
import { search } from '../header/reducers/search'
import { routerReducer } from 'react-router-redux'


const rootReducer = combineReducers({
  cart,
  checkout,
  form: formReducer,
  pages,
  products,
  routing: routerReducer,
  search,
  searchProducts,
  searchTodos,
  showCompleted,
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
