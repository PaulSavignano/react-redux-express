import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'
import Routing from './Routing'
import './index.css'

// Actions
import { fetchCards } from './cards/actions/index'
import { fetchCart } from './carts/actions/index'
import { fetchCarousels } from './carousels/actions/index'
import { fetchSections } from './sections/actions/index'
import { fetchOrders } from './orders/actions/index'
import { fetchPages } from './pages/actions/index'
import { fetchProducts } from './products/actions/index'
import { fetchUser } from './users/actions/index'
import { fetchBrand } from './brand/actions/index'

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

store.dispatch(fetchCards())
store.dispatch(fetchCarousels())
store.dispatch(fetchSections())
store.dispatch(fetchPages())
store.dispatch(fetchProducts())
store.dispatch(fetchBrand())


ReactDOM.render(
  <Provider store={store}>
    <Routing history={history} />
  </Provider>,
  document.getElementById('root')
)
