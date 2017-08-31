import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'material-ui/Card'

import cartContainer from '../../containers/cart/cartContainer'
import CartList from './CartList'
import CartTotal from './CartTotal'

const CartPage = ({ cart, dispatch, user }) => (
  !cart.items.length ?
  <Card zDepth={0} className="section page">
    <CardTitle title="Nothing in your cart yet" />
  </Card>
  :
  <Card zDepth={0} className="section page">
    <CardTitle title="Cart" />
    <CartList
      cart={cart}
      dispatch={dispatch}
    />
    <CartTotal
      cart={cart}
      dispatch={dispatch}
      user={user}
    />
  </Card>
)

export default cartContainer(CartPage)
