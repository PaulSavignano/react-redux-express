import React from 'react'
import { connect } from 'react-redux'
import Checkout from '../components/Checkout'

const CheckoutPage = ({ total, cart }) => (
  <main>
    <h3>Checkout {total}</h3>
    <Checkout total={total} cart={cart} />
  </main>
)

const mapStateToProps = (state) => ({
  total: state.cart.total,
  cart: state.cart.items
})

export default connect(mapStateToProps)(CheckoutPage)
