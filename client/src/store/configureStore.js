import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { searchTodos, showCompleted, todos } from '../todos/reducers/todos'
import { auth } from '../auth/reducers/auth'

const rootReducer = combineReducers({
  form: formReducer,
  searchTodos,
  showCompleted,
  todos,
  auth,
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
