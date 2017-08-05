import React from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle } from 'material-ui/Card'

import CartList from './CartList'
import CartTotal from './CartTotal'

const CartPage = ({ isFetching, cart, user }) => (
  !isFetching && !cart.items.length ?
  <Card zDepth={0} className="section page">
    <CardTitle title="Nothing in your cart yet" />
  </Card>
  :
  <Card zDepth={0} className="section page">
    <CardTitle title="Cart" />
    <CartList cart={cart} />
    <CartTotal cart={cart} user={user} />
  </Card>
)

const mapStateToProps = ({ carts: { cart, isFetching }, user }) => ({
  isFetching,
  cart,
  user
})

export default connect(mapStateToProps)(CartPage)
