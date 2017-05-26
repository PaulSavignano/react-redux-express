import React from 'react'

import OrderItem from './OrderItem'

const OrderList = ({ items }) => (
  !items.length ? <h3>No items yet</h3> :
  <div>
    {items.map(item => (
      <OrderItem
        key={item._id}
        item={item}
      />
    ))}
  </div>
)

export default OrderList
