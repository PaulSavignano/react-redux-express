import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Theme from './Theme'

import configureStore from './store/configureStore'
import routes from './routes'
import './index.css'
import { fetchUser } from './users/actions/users'
import { fetchPages } from './pages/actions/page'
import { fetchCart } from './products/actions/cart'
import { fetchProducts } from './products/actions/product'



injectTapEventPlugin()

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(fetchUser(token));
}

const cart = localStorage.getItem('cart');
if (cart) {
  store.dispatch(fetchCart(cart));
}

store.dispatch(fetchPages())
store.dispatch(fetchCart())
store.dispatch(fetchProducts())

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
    <Provider store={store}>
      {routes(history)}
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
