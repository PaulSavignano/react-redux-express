import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App'
import HomePage from './home/components/HomePage'
import TodosPage from './todos/components/TodosPage'
import Signup from './users/components/Signup'
import Signin from './users/components/Signin'
import Signout from './users/components/Signout'
import Recover from './users/components/Recover'
import Reset from './users/components/Reset'
import ProductsPage from './products/containers/ProductsPage'
import AdminProductsPage from './products/containers/AdminProductsPage'
import CartPage from './products/containers/CartPage'
import CheckoutPage from './products/containers/CheckoutPage'
import ProfilePage from './users/containers/ProfilePage'

import RequireAuth from './users/components/RequireAuth'

export default history => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="todos" component={RequireAuth(TodosPage, ['user', 'admin'])} />
      <Route path="products" component={ProductsPage} />
      <Route path="admin/products" component={AdminProductsPage} />
      <Route path="cart" component={CartPage} />
      <Route path="checkout" component={RequireAuth(CheckoutPage, ['user'])} />
      <Route path="signup" component={Signup} />
      <Route path="signin" component={Signin} />
      <Route path="signout" component={Signout} />
      <Route path="recover" component={Recover} />
      <Route path="profile" component={ProfilePage} />
    </Route>
  </Router>
)
