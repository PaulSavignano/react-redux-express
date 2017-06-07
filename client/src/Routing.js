import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import ReactGA from 'react-ga'

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
import Profile from './users/containers/Profile'
import RequestEstimate from './users/components/RequestEstimate'

// Product
import Product from './products/containers/Product'

//Order
import OrderAdd from './orders/containers/OrderAdd'
import Orders from './orders/containers/Orders'
import OrderConfirmation from './orders/containers/OrderConfirmation'
import OrderDetail from './orders/containers/OrderDetail'
import AdminOrders from './orders/containers/AdminOrders'
import AdminOrderDetail from './orders/containers/AdminOrderDetail'

import NotFound from './NotFound'

ReactGA.initialize('UA-100349397-1')
const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const Routing = ({ history }) => (
  <Router history={history} onUpdate={logPageView}>
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
      <Route path="products/:productId" component={Product} />

      {/* Orders */}
      <Route path="admin/orders" component={RequireAuth(AdminOrders, ['admin'])} />
      <Route path="admin/orders/:orderId" component={RequireAuth(AdminOrderDetail, ['admin'])} />

      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

export default Routing
