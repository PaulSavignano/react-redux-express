import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { searchTodos, showCompleted, todos } from '../todos/reducers/todos'
import { user } from '../users/reducers/users'
import { searchProducts, products } from '../products/reducers/products'
import { cart } from '../products/reducers/cart'
import { checkout } from '../products/reducers/checkout'
import { search } from '../header/reducers/search'
import { routerReducer } from 'react-router-redux'


const rootReducer = combineReducers({
  form: formReducer,
  search,
  searchTodos,
  showCompleted,
  todos,
  searchProducts,
  products,
  cart,
  user,
  checkout,
  routing: routerReducer
})




const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}


export default configureStore
