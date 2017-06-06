import React from 'react'
import { connect } from 'react-redux'

import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'

const Cart = ({ isFetching, cart, user }) => (
  isFetching ? null :
  <section>
    <h1>Cart</h1>
    <CartList cart={cart} />
    <CartTotal cart={cart} user={user} />
  </section>
)

const mapStateToProps = ({ cart, user }) => ({
  isFetching: cart.isFetching,
  cart: cart.cart,
  user
})

export default connect(mapStateToProps)(Cart)
