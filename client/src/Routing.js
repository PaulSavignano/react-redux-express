import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App'

// Brand
import AdminBrand from './brand/containers/AdminBrand'

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
import Profile from './users/containers/Profile'
import RequestEstimate from './users/components/RequestEstimate'

// Product
import Products from './products/containers/Products'
import Product from './products/containers/Product'
import AdminProducts from './products/containers/AdminProducts'

// Cart
import Cart from './carts/containers/Cart'

//Order
import OrderAdd from './orders/containers/OrderAdd'
import Orders from './orders/containers/Orders'
import OrderConfirmation from './orders/containers/OrderConfirmation'
import OrderDetail from './orders/containers/OrderDetail'

import NotFound from './NotFound'

const Routing = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>

      {/* Page */}
      <IndexRoute component={Page} />
      <Route path=":slug" component={Page} />
      <Route path="admin/pages" component={RequireAuth(AdminPage, ['admin'])} />
      <Route path="admin/pages/:slug" component={RequireAuth(AdminPageEdit, ['admin'])} />


      {/* Brand */}
      <Route path="admin/brand" component={RequireAuth(AdminBrand, ['admin'])} />

      {/* User */}
      <Route path="user/signup" component={Signup} />
      <Route path="user/signin" component={Signin} />
      <Route path="user/recovery" component={Recovery} />
      <Route path="user/reset/:token" component={Reset} />
      <Route path="user/profile" component={RequireAuth(Profile, ['admin', 'user'])} />
      <Route path="user/order" component={RequireAuth(OrderAdd, ['user'])} />
      <Route path="user/order/:orderId" component={RequireAuth(OrderConfirmation, ['user'])} />
      <Route path="user/orders" component={RequireAuth(Orders, ['user'])} />
      <Route path="user/orders/:orderId" component={RequireAuth(OrderDetail, ['user'])} />
      <Route path="user/request-estimate" component={RequestEstimate} />

      {/* Product */}
      <Route path="product/:slug" component={Product} />
      <Route path="admin/products" component={RequireAuth(AdminProducts, ['admin'])} />


      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

export default Routing
