import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App'

// Theme
import AdminThemePage from './theme/containers/AdminThemePage'

// Page
import Page from './pages/containers/Page'
import AdminPage from './pages/containers/AdminPage'
import AdminPageEdit from './pages/containers/AdminPageEdit'

// User
import RequireAuth from './users/components/RequireAuth'
import Signup from './users/components/Signup'
import Signin from './users/components/Signin'
import Recovery from './users/components/Recovery'
import Reset from './users/components/Reset'
import Contact from './users/components/Contact'
import ProfilePage from './users/containers/ProfilePage'

// Product
import Products from './products/containers/Products'
import Product from './products/containers/Product'
import AdminProductList from './products/containers/AdminProductList'

// Cart
import Cart from './carts/containers/Cart'

//Order
import OrderAdd from './orders/containers/OrderAdd'
import Orders from './orders/containers/Orders'
import OrderConfirmation from './orders/containers/OrderConfirmation'
import OrderDetail from './orders/containers/OrderDetail'

import TodosPage from './todos/components/TodosPage'

const Routing = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>

      {/* Page */}
      <IndexRoute page="home" component={Page} />
      <Route path="pages/:slug" component={Page} />
      <Route path="admin/pages/:slug" component={RequireAuth(AdminPageEdit, ['admin'])} />
      <Route path="admin/pages" component={RequireAuth(AdminPage, ['admin'])} />

      {/* Theme */}
      <Route path="admin/theme" component={RequireAuth(AdminThemePage, ['admin'])} />

      {/* User */}
      <Route path="signup" component={Signup} />
      <Route path="signin" component={Signin} />
      <Route path="recovery" component={Recovery} />
      <Route path="reset/:token" component={Reset} />
      <Route path="contact" component={Contact} />
      <Route path="profile" component={ProfilePage} />

      {/* Product */}
      <Route path="todos" component={RequireAuth(TodosPage, ['user', 'admin'])} />
      <Route path="products" component={Products} />
      <Route path="product/:slug" component={Product} />
      <Route path="admin/products" component={RequireAuth(AdminProductList, ['admin'])} />
      <Route path="cart" component={Cart} />
      <Route path="order" component={RequireAuth(OrderAdd, ['user'])} />
      <Route path="order/:orderId" component={RequireAuth(OrderConfirmation, ['user'])} />
      <Route path="orders" component={RequireAuth(Orders, ['user'])} />
      <Route path="orders/:orderId" component={RequireAuth(OrderDetail, ['user'])} />

    </Route>
  </Router>
)

export default Routing
