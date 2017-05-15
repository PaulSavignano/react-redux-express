import React from 'react'
import { connect } from 'react-redux'
import OrderAdd from '../components/OrderAdd'

const Order = ({ isFetching, total, cart }) => (
  isFetching ? null : 
  <main>
    <section><h1>Checkout</h1></section>
    <OrderAdd total={total} cart={cart} />
  </main>
)

const mapStateToProps = (state) => ({
  isFetching: state.cart.isFetching,
  total: state.cart.total,
  cart: state.cart.items
})

export default connect(mapStateToProps)(Order)
