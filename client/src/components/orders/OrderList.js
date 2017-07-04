import React from 'react'

import OrderItem from './OrderItem'

const OrderList = ({ orders, fontFamily, color }) => (
  !orders.length ? <h3 style={{ fontFamily, color }}>No orders yet</h3> :
  <div>
    {orders.map(order => (
      <OrderItem
        key={order._id}
        order={order}
      />
    ))}
  </div>
)

export default OrderList
