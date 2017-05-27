import React from 'react'

import OrderItem from './OrderItem'

const OrderList = ({ items, fontFamily, color }) => (
  !items.length ? <h3 style={{ fontFamily, color }}>No items yet</h3> :
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
