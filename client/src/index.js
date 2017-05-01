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
import { startAuthUser } from './users/actions/users'
import { startFetchPages } from './pages/actions/page'
import { startFetchCart } from './products/actions/cart'
import { startFetchProducts } from './products/actions/product'



injectTapEventPlugin()

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(startAuthUser(token));
}

store.dispatch(startFetchPages())
store.dispatch(startFetchCart())
store.dispatch(startFetchProducts())

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
    <Provider store={store}>
      {routes(history)}
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
