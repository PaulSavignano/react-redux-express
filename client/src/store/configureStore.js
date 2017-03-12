import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { searchTodos, showCompleted, todos } from '../todos/reducers/todos'
import { searchProducts, products } from '../products/reducers/products'
import { users } from '../users/reducers/users'

const rootReducer = combineReducers({
  form: formReducer,
  searchTodos,
  showCompleted,
  todos,
  searchProducts,
  products,
  users,
})

const configureStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}

export default configureStore
