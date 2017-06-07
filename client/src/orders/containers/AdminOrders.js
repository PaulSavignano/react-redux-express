import React from 'react'
import { connect } from 'react-redux'

import AdminOrderList from '../components/AdminOrderList'

const AdminOrders = ({ isFetching, orders, fontFamily, color }) => {
  return (
    isFetching ? null :
    <section>
      <h1 style={{ fontFamily, color }}>Orders</h1>
      <AdminOrderList orders={orders} fontFamily={fontFamily} color={color} />
    </section>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.orders.isFetching,
  orders: state.orders.items,
  fontFamily: state.brand.values.fontFamily || null,
  color: state.brand.values.textColor || null
})

export default connect(mapStateToProps)(AdminOrders)
