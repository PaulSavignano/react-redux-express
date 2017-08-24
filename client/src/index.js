import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'
import Routing from './Routing'
import './index.css'

import { fetchBrand } from './actions/brand'
import { fetchCart } from './actions/cart'
import { fetchOrders } from './actions/orders'
import { fetchPages } from './actions/pages'
import { fetchUser } from './actions/users'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

const token = localStorage.getItem('token')
if (token) {
  store.dispatch(fetchUser(token))
  store.dispatch(fetchOrders())
}

const cart = localStorage.getItem('cart')
if (cart) {
  store.dispatch(fetchCart(cart))
}

store.dispatch(fetchBrand())
store.dispatch(fetchPages())

ReactDOM.render(
  <Provider store={store}>
    <Routing history={history} />
  </Provider>,
  document.getElementById('root')
)
