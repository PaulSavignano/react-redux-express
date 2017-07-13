import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
//import ReactGA from 'react-ga'

import App from './App'

// Brand
import AdminBrand from './components/brand/AdminBrand'

// Page
import PageContainer from './containers/pages/PageContainer'
import AdminPage from './containers/pages/AdminPage'
import AdminPageEdit from './containers/pages/AdminPageEdit'

// User
import Cart from './containers/cart/Cart'
import RequireAuth from './containers/users/RequireAuth'
import Signup from './containers/users/Signup'
import Signin from './containers/users/Signin'
import Recovery from './containers/users/Recovery'
import Reset from './containers/users/Reset'
import ProfilePage from './components/users/ProfilePage'
import RequestEstimate from './containers/users/RequestEstimate'

// Product
import ProductPage from './containers/products/ProductPage'

//Order
import OrderAdd from './containers/orders/OrderAdd'
import OrderConfirmation from './containers/orders/OrderConfirmation'
import OrderDetailPage from './containers/orders/OrderDetailPage'
import AdminOrderList from './containers/orders/AdminOrderList'
import AdminOrderDetail from './containers/orders/AdminOrderDetail'

import NotFound from './components/NotFound'

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
      <IndexRoute component={PageContainer} />
      <Route path=":slug" component={PageContainer} />
      <Route path="admin/pages" component={RequireAuth(AdminPage, ['admin'])} />
      <Route path="admin/pages/:slug" component={RequireAuth(AdminPageEdit, ['admin'])} />


      {/* Brand */}
      <Route path="admin/brand" component={RequireAuth(AdminBrand, ['admin'])} />

      {/* User */}
      <Route path="user/cart" component={Cart} />
      <Route path="user/signup" component={Signup} />
      <Route path="user/signin" component={Signin} />
      <Route path="user/recovery" component={Recovery} />
      <Route path="user/reset/:token" component={Reset} />
      <Route path="user/profile" component={RequireAuth(ProfilePage, ['admin', 'user'])} />
      <Route path="user/order" component={RequireAuth(OrderAdd, ['user'])} />
      <Route path="user/order/:orderId" component={RequireAuth(OrderConfirmation, ['user'])} />
      <Route path="user/orders/:orderId" component={RequireAuth(OrderDetailPage, ['user'])} />
      <Route path="user/request-estimate" component={RequestEstimate} />

      {/* Product */}
      <Route path="products/:product/:productId" component={ProductPage} />

      {/* Orders */}
      <Route path="admin/orders" component={RequireAuth(AdminOrderList, ['admin'])} />
      <Route path="admin/orders/:orderId" component={RequireAuth(AdminOrderDetail, ['admin'])} />

      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

export default Routing
