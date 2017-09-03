import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
//import ReactGA from 'react-ga'

import authenticate from './containers/user/authenticate'

import App from './components/app/App'
import AdminPage from './components/pages/AdminPage'
import AdminPages from './components/pages/AdminPages'
import AdminOrderPage from './components/orders/AdminOrderPage'
import AdminOrderDetailPage from './components/orders/AdminOrderDetailPage'
import AdminUsersPage from './components/users/AdminUsersPage'
import AdminUsersEditUserPage from './containers/users/AdminUsersEditUserPage'
import BrandAdmin from './components/brands/BrandAdmin'
import CartPage from './components/cart/CartPage'
import NotFound from './components/not-found/NotFound'
import OrderAdd from './components/orders/OrderAdd'
import OrderConfirmation from './components/orders/OrderConfirmation'
import OrderDetailPage from './components/orders/OrderDetailPage'
import Page from './components/pages/Page'
import ProductPage from './components/products/ProductPage'
import UserProfilePage from './containers/user/UserProfilePage'
import Recovery from './components/user/Recovery'
import Reset from './components/user/Reset'
import Signin from './components/user/Signin'
import Signup from './components/user/Signup'

import RequestEstimate from './components/user/RequestEstimate'

// Google Analytics
// ReactGA.initialize('UA-100349397-1')
// const logPageView = () => {
//   ReactGA.set({ page: window.location.pathname + window.location.search })
//   ReactGA.pageview(window.location.pathname + window.location.search)
// }

const Routing = ({ history }) => (
  <Router history={history} /*onUpdate={logPageView}*/>
    <Route path="/" component={App}>

      {/* Page */}
      <IndexRoute component={Page} />
      <Route path=":slug" component={Page} />
      <Route path="admin/pages" component={authenticate(AdminPages, ['admin'])} />
      <Route path="admin/pages/:slug" component={authenticate(AdminPage, ['admin'])} />
      <Route path="admin/users" component={authenticate(AdminUsersPage, ['owner'])} />
      <Route path="admin/users/edit/:userId" component={authenticate(AdminUsersEditUserPage, ['owner'])} />

      {/* Brand */}
      <Route path="admin/brand" component={authenticate(BrandAdmin, ['admin'])} />

      {/* User */}
      <Route path="user/cart" component={CartPage} />
      <Route path="user/signup" component={Signup} />
      <Route path="user/signin" component={Signin} />
      <Route path="user/recovery" component={Recovery} />
      <Route path="user/reset/:token" component={Reset} />
      <Route path="user/profile" component={authenticate(UserProfilePage, ['admin', 'user'])} />
      <Route path="user/order" component={authenticate(OrderAdd, ['user'])} />
      <Route path="user/order/:orderId" component={authenticate(OrderConfirmation, ['user'])} />
      <Route path="user/orders/:orderId" component={authenticate(OrderDetailPage, ['user'])} />
      <Route path="user/request-estimate" component={RequestEstimate} />


      {/* Product */}
      <Route path="products/:productSlug/:productId" component={ProductPage} />

      {/* Orders */}
      <Route path="admin/orders" component={authenticate(AdminOrderPage, ['admin'])} />
      <Route path="admin/orders/:orderId" component={authenticate(AdminOrderDetailPage, ['admin'])} />

      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

export default Routing
