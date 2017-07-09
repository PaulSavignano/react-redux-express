import React from 'react'
import { connect } from 'react-redux'

import CartList from './CartList'
import CartTotal from './CartTotal'

const Cart = ({ isFetching, cart, user }) => (
  !isFetching && !cart.items.length ? <section><h1>Nothing in your cart yet</h1></section> :
  <section>
    <h1>Cart</h1>
    <CartList cart={cart} />
    <CartTotal cart={cart} user={user} />
  </section>
)

const mapStateToProps = ({ cart: { cart }, user }) => ({
  isFetching: cart.isFetching,
  cart,
  user
})

export default connect(mapStateToProps)(Cart)
