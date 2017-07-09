import React from 'react'
import { connect } from 'react-redux'

import OrderItem from '../../components/orders/OrderItem'

const OrderList = ({ isFetching, orders }) => (
  isFetching ? null : !orders.length ? <h3>You do not have any orders yet</h3> :
  <div>
    {orders.map(order => (
      <OrderItem
        key={order._id}
        order={order}
      />
    ))}
  </div>
)

const mapStateToProps = ({ orders: { isFetching, items }}) => ({
  isFetching,
  orders: items,
})

export default connect(mapStateToProps)(OrderList)
