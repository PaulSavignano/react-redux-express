import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'
import routes from './routes'
import './index.css'

// material-ui
import Theme from './Theme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Actions
import { fetchCards } from './cards/actions/index'
import { fetchCart } from './products/actions/cart'
import { fetchPages } from './pages/actions/page'
import { fetchProducts } from './products/actions/product'
import { fetchUser } from './users/actions/users'
import { fetchTheme } from './theme/actions/theme'

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

store.dispatch(fetchCards())
store.dispatch(fetchPages())
store.dispatch(fetchProducts())
store.dispatch(fetchTheme())


ReactDOM.render(
  <Provider store={store}>
    <Theme />
  </Provider>,
  document.getElementById('root')
);
