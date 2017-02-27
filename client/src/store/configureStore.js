import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import todoReducer from '../todos/reducers/index'

const configureStore = (initialState = {}) => {
  const store = createStore(
    todoReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}

export default configureStore
