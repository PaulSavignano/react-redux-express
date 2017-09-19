import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import configureStore from './store/configureStore'
import Head from './containers/head/Head'
import AppRouter, { history } from './components/routers/AppRouter'
import Theme from './containers/theme/Theme'

import { fetchBrand } from './actions/brand'
import { fetchCart } from './actions/cart'
import { fetchOrders } from './actions/orders'
import { fetchPages } from './actions/pages'
import { fetchProducts } from './actions/products'
import { fetchUser } from './actions/user'

const store = configureStore()

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
store.dispatch(fetchProducts())

render(
    <Provider store={store}>
      <div>
        <Head/>
        <Theme>
          <AppRouter />
        </Theme>
      </div>
    </Provider>,
  document.getElementById('root')
)
