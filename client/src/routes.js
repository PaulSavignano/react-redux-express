import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import HomePage from './home/components/HomePage'
import TodosPage from './todos/components/TodosPage'
import Signup from './users/components/Signup'
import Signin from './users/components/Signin'
import Signout from './users/components/Signout'
import ProductsPage from './products/containers/ProductsPage'
import AdminProductsPage from './products/containers/AdminProductsPage'
import CartPage from './products/containers/CartPage'
import CheckoutPage from './products/containers/CheckoutPage'
import ProfilePage from './users/containers/ProfilePage'


const requireAuth = (nextState, replace) => {
  if (!localStorage.getItem('token')) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}


const requireCart = (nextState, replace, next) => {
  if (!localStorage.getItem('cart')) {
    replace('/')
  }
  next()
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="todos" component={TodosPage} onEnter={requireAuth} />
    <Route path="products" component={ProductsPage} />
    <Route path="admin/products" component={AdminProductsPage} />
    <Route path="cart" component={CartPage} />
    <Route path="checkout" component={CheckoutPage} onEnter={requireAuth} />
    <Route path="signup" component={Signup} />
    <Route path="signin" component={Signin} />
    <Route path="signout" component={Signout} />
    <Route path="profile" component={ProfilePage} onEnter={requireAuth} />
  </Route>
)
