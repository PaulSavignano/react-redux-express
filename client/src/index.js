import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


import configureStore from './store/configureStore'
import './index.css'
import App from './App'
import HomePage from './home/components/HomePage'
import TodoPage from './todos/components/TodoPage'
import Signup from './users/components/Signup'
import Signin from './users/components/Signin'
import Signout from './users/components/Signout'
import ProductsPage from './products/components/ProductsPage'
import AdminProductsPage from './products/components/AdminProductsPage'
import CartPage from './products/components/CartPage'
import { authUser } from './users/actions/index'

injectTapEventPlugin()

const store = configureStore()

const token = localStorage.getItem('token')

if (token) {
  store.dispatch(authUser(token))
}

const requireAuth = (nextState, replace, next) => {
  if (!localStorage.getItem('token')) {
    replace('/signin')
  }
  next()
}

ReactDOM.render(
  <MuiThemeProvider muiTheme={ getMuiTheme() }>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={HomePage} />
          <Route path="todos" component={TodoPage} onEnter={requireAuth} />
          <Route path="products" component={ProductsPage} />
          <Route path="admin/products" component={AdminProductsPage} />
          <Route path="cart" component={CartPage} />
          <Route path="signup" component={Signup} />
          <Route path="signin" component={Signin} />
          <Route path="signout" component={ Signout } />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
