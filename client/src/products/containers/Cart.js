import React from 'react'
import { connect } from 'react-redux'

import CartItem from '../components/CartItem'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'
import { fetchCart } from '../actions/cart'

const Cart = ({ isFetching, items, total, user }) => (
  isFetching ? null :
  <main>
    <section><h1>Cart</h1></section>
    <CartList items={items} />
    <section><CartTotal total={total} user={user} /></section>
  </main>
)

const mapStateToProps = (state) => {
  const isFetching = state.cart.isFetching
  const items = isFetching ? [] : state.cart.items
  const total = isFetching ? null : state.cart.total
  const user = state.user
  console.log('Cart', total, user)
  return {
    isFetching,
    items,
    total,
    user
  }
}

export default connect(mapStateToProps)(Cart)
