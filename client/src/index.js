import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'
import Routes from './Routes'
import './index.css'

// Actions
import { fetchCards } from './cards/actions/index'
import { fetchCarousels } from './carousels/actions/index'
import { fetchCart } from './products/actions/cart'
import { fetchHeros } from './heros/actions/index'
import { fetchPages } from './pages/actions/index'
import { fetchProducts } from './products/actions/product'
import { fetchUser } from './users/actions/index'
import { fetchTheme } from './theme/actions/index'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)


const token = localStorage.getItem('token')
if (token) {
  store.dispatch(fetchUser(token))
}

const cart = localStorage.getItem('cart')
if (cart) {
  store.dispatch(fetchCart(cart))
}

store.dispatch(fetchCards())
store.dispatch(fetchCarousels())
store.dispatch(fetchHeros())
store.dispatch(fetchPages())
store.dispatch(fetchProducts())
store.dispatch(fetchTheme())


ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('root')
)
