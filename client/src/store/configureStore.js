import redux from 'redux'
import thunk from 'redux-thunk'
import { nameReducer, hobbiesReducer } from '../reducers/index'

export const configure = () => {
  const reducer = redux.combineReducers({
    name: nameReducer,
  })
  const store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
  return store
}
