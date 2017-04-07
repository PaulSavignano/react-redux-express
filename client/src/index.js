import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import configureStore from './store/configureStore'
import routes from './routes'
import './index.css'
import { startAuthUser } from './users/actions/users'
import { saveState } from './modules/localStorage'

injectTapEventPlugin()

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(startAuthUser(token));
}

store.subscribe(() => {
  saveState({
    cart: store.getState().cart
  })
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={ getMuiTheme() }>
    <Provider store={store}>
      {routes(history)}
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
