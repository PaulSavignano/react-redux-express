import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import configureStore from './store/configureStore'
import routes from './routes'
import './index.css'
import { startAuthUser } from './users/actions/index'
import { saveState } from './modules/localStorage'

injectTapEventPlugin()

const store = configureStore()

const token = localStorage.getItem('token')
if (token) {
  store.dispatch(startAuthUser(token))
}

store.subscribe(() => {
  saveState({
    cart: store.getState().cart
  })
})

console.log(process.env.GMAIL_USER)

ReactDOM.render(
  <MuiThemeProvider muiTheme={ getMuiTheme() }>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
