import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'
import Routing from './Routing'
import './index.css'

// Actions
import { fetchButtons } from './actions/buttons'
import { fetchBrand } from './actions/brand'
import { fetchCards } from './actions/cards'
import { fetchCart } from './actions/cart'
import { fetchSlides } from './actions/slides'
import { fetchSections } from './actions/sections'
import { fetchOrders } from './actions/orders'
import { fetchPages } from './actions/pages'
import { fetchProducts } from './actions/products'
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

store.dispatch(fetchButtons())
store.dispatch(fetchBrand())
store.dispatch(fetchCards())
store.dispatch(fetchPages())
store.dispatch(fetchProducts())
store.dispatch(fetchSections())
store.dispatch(fetchSlides())

ReactDOM.render(
  <Provider store={store}>
    <Routing history={history} />
  </Provider>,
  document.getElementById('root')
)
