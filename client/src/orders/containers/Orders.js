import React from 'react'
import { connect } from 'react-redux'

import OrderList from '../components/OrderList'

const Orders = ({ isFetching, orders, fontFamily, color }) => {
  return (
    isFetching ? null :
    <section>
      <h1 style={{ fontFamily, color }}>Orders</h1>
      <OrderList orders={orders} fontFamily={fontFamily} color={color} />
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.orders.isFetching,
  orders: state.orders.items,
  fontFamily: state.brand.values.fontFamily || null,
  color: state.brand.values.textColor || null
})

export default connect(mapStateToProps)(Orders)
