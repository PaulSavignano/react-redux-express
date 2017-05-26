import React from 'react'
import { connect } from 'react-redux'

import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'

const Cart = ({ isFetching, items, total, user }) => (
  isFetching ? null :
  <section>
    <h1>Cart</h1>
    <CartList items={items} />
    <CartTotal total={total} user={user} />
  </section>
)

const mapStateToProps = ({ cart, user }) => ({
  isFetching: cart.isFetching,
  items: cart.items || null,
  total: cart.total,
  user
})

export default connect(mapStateToProps)(Cart)
