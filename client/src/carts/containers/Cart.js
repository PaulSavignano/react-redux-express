import React from 'react'
import { connect } from 'react-redux'

import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'

const Cart = ({ isFetching, items, total, user }) => (
  isFetching ? null :
  <main>
    <section><h1>Cart</h1></section>
    <CartList items={items} />
    <section><CartTotal total={total} user={user} /></section>
  </main>
)

const mapStateToProps = (state) => ({
  isFetching: state.cart.isFetching,
  items: state.cart.items,
  total: state.cart.total,
  user: state.user
})

export default connect(mapStateToProps)(Cart)
