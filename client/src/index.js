import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// material-ui
import Theme from './Theme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import configureStore from './store/configureStore'
import routes from './routes'
import './index.css'
import { fetchUser } from './users/actions/users'
import { fetchPages } from './pages/actions/page'
import { fetchCart } from './products/actions/cart'
import { fetchProducts } from './products/actions/product'
import { fetchTheme } from './theme/actions/theme'

import { connect } from 'react-redux'

injectTapEventPlugin()

const store = configureStore()

export const history = syncHistoryWithStore(browserHistory, store)

const token = localStorage.getItem('token')
if (token) {
  store.dispatch(fetchUser(token))
}

const cart = localStorage.getItem('cart')
if (cart) {
  store.dispatch(fetchCart(cart))
}

store.dispatch(fetchTheme())
store.dispatch(fetchPages())
store.dispatch(fetchProducts())





ReactDOM.render(
  <Provider store={store}>

    <Theme />

  </Provider>,
  document.getElementById('root')
);
