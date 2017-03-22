import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { searchTodos, showCompleted, todos } from '../todos/reducers/todos'
import { users } from '../users/reducers/users'
import { searchProducts, products } from '../products/reducers/products'
import cart from '../products/reducers/index'
import { charge } from '../products/reducers/charge'
import { loadState } from '../modules/localStorage'

const persistedState = loadState()
const rootReducer = combineReducers({
  form: formReducer,
  searchTodos,
  showCompleted,
  todos,
  searchProducts,
  products,
  cart,
  users,
  charge
})




const configureStore = () => {
  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}


export default configureStore
