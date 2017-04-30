import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App'
import Page from './pages/components/Page'
import TodosPage from './todos/components/TodosPage'
import Signup from './users/components/Signup'
import Signin from './users/components/Signin'
import Signout from './users/components/Signout'
import Recover from './users/components/Recover'
import ProductsPage from './products/containers/ProductsPage'
import ProductPage from './products/containers/ProductPage'
import AdminProductsPage from './products/containers/AdminProductsPage'

import AdminPageNameList from './pages/components/AdminPageNameList'
import AdminPageEdit from './pages/components/AdminPageEdit'

import CartPage from './products/containers/CartPage'
import CheckoutPage from './products/containers/CheckoutPage'
import ProfilePage from './users/containers/ProfilePage'

import RequireAuth from './users/components/RequireAuth'

export default history => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute page="home" component={Page} />
      <Route path="todos" component={RequireAuth(TodosPage, ['user', 'admin'])} />
      <Route path="products" component={ProductsPage} />
      <Route path="product/:slug" component={ProductPage} />
      <Route path="admin/products" component={AdminProductsPage} />
      <Route path="admin/pages/:slug" component={AdminPageEdit} />
      <Route path="admin/pages" component={AdminPageNameList} />
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
