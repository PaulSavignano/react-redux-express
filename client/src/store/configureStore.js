import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import { reducer as formReducer } from 'redux-form'
import { searchTodos, showCompleted, todos } from '../todos/reducers/todos'
import { user } from '../users/reducers/users'
import { searchProducts, products } from '../products/reducers/products'
import cards from '../cards/reducers/card'
import { cart } from '../products/reducers/cart'
import { pages } from '../pages/reducers/page'
import { order } from '../products/reducers/order'
import { search } from '../header/reducers/search'
import theme from '../theme/reducers/theme'
import { routerReducer } from 'react-router-redux'


const rootReducer = combineReducers({
  cards,
  cart,
  order,
  form: formReducer,
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
