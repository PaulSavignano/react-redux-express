import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { reducer as formReducer } from 'redux-form'

import brand from '../reducers/brand'
import carts from '../reducers/carts'
import drawer from '../reducers/drawer'
import editItem from '../reducers/editItem'
import orders from '../reducers/orders'
import pages from '../reducers/pages'
import search from '../reducers/search'
import swipeables from '../reducers/swipeables'
import user from '../reducers/users'

const rootReducer = combineReducers({
  brand,
  carts,
  drawer,
  editItem,
  form: formReducer,
  orders,
  pages,
  routing: routerReducer,
  search,
  swipeables,
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
