import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import configureStore from './store/configureStore'
import './index.css'
import App from './containers/App'
import RequireAuth from './auth/components/RequireAuth'
import HomePage from './home/components/HomePage'
import TodoPage from './todos/components/TodoPage'
import Signup from './auth/components/Signup'
import Signin from './auth/components/Signin'
import Signout from './auth/components/Signout'
import Product from './products/components/Product'
import { authUser } from './auth/actions/index'

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
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="todos" component={TodoPage} onEnter={requireAuth} />
        <Route path="products" component={Product} />
        <Route path="signup" component={Signup} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={ Signout } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
