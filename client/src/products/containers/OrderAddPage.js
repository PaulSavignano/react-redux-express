import React from 'react'
import { connect } from 'react-redux'
import OrderAdd from '../components/OrderAdd'

const OrderAddPage = ({ total, cart }) => (
  <main>
    <h1>Checkout {total}</h1>
    <OrderAdd total={total} cart={cart} />
  </main>
)

const mapStateToProps = (state) => ({
  total: state.cart.total,
  cart: state.cart.items
})

export default connect(mapStateToProps)(OrderAddPage)
