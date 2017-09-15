import React from 'react'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
//import ReactGA from 'react-ga'

import authenticate from '../../containers/user/authenticate'

import App from './App'
import AdminPage from '../pages/AdminPage'
import AdminPages from '../pages/AdminPages'
import AdminOrderPage from '../orders/AdminOrderPage'
import AdminOrderDetailPage from '../orders/AdminOrderDetailPage'
import AdminUsersPage from '../users/AdminUsersPage'
import AdminUsersEditUserPage from '../../containers/users/AdminUsersEditUserPage'
import BrandAdmin from '../brands/BrandAdmin'
import CartPage from '../cart/CartPage'
import NotFound from '../not-found/NotFound'
import OrderAdd from '../orders/OrderAdd'
import OrderConfirmation from '../orders/OrderConfirmation'
import OrderDetailPage from '../orders/OrderDetailPage'
import Page from '../pages/Page'
import ProductPage from '../products/ProductPage'
import UserProfilePage from '../../containers/user/UserProfilePage'
import Recovery from '../user/Recovery'
import Reset from '../user/Reset'
import Signin from '../user/Signin'
import Signup from '../user/Signup'

import RequestEstimate from '../user/RequestEstimate'
import withTracker from './withTracker'

// Google Analytics
// ReactGA.initialize('UA-100349397-1')
// const logPageView = () => {
//   ReactGA.set({ page: window.location.pathname + window.location.search })
//   ReactGA.pageview(window.location.pathname + window.location.search)
// }

const Routes1 = () => (
  <Switch>
    <Route exact path="/:slug" component={withTracker(Page)} />
    <Route exact path="/admin/pages" component={authenticate(AdminPages, ['admin'])} />
    <Route exact path="/admin/pages/:slug" component={authenticate(AdminPage, ['admin'])} />
    <Route exact path="/admin/users" component={authenticate(AdminUsersPage, ['owner'])} />
    <Route exact path="/admin/users/edit/:userId" component={authenticate(AdminUsersEditUserPage, ['owner'])} />
    <Route exact path="/admin/brand" component={authenticate(BrandAdmin, ['admin'])} />
    <Route exact path="/user/cart" component={withTracker(CartPage)} />
    <Route exact path="/user/signup" component={withTracker(Signup)} />
    <Route exact path="/user/signin" component={withTracker(Signin)} />
    <Route exact path="/user/recovery" component={Recovery} />
    <Route exact path="/user/reset/:token" component={Reset} />
    <Route exact path="/user/profile" component={authenticate(UserProfilePage, ['admin', 'user'])} />
    <Route exact path="/user/order" component={withTracker(authenticate(OrderAdd, ['user']))} />
    <Route exact path="/user/order/:orderId" component={withTracker(authenticate(OrderConfirmation, ['user']))} />
    <Route exact path="/user/orders/:orderId" component={authenticate(OrderDetailPage, ['user'])} />
    <Route exact path="/user/request-estimate" component={withTracker(RequestEstimate)} />
    <Route exact path="/products/:productSlug/:productId" component={withTracker(ProductPage)} />
    <Route exact path="/admin/orders" component={authenticate(AdminOrderPage, ['admin'])} />
    <Route exact path="/admin/orders/:orderId" component={authenticate(AdminOrderDetailPage, ['admin'])} />
    <Route component={withTracker(NotFound)} />
  </Switch>
)

export default withRouter(Routes1)
