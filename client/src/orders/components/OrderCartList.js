import React from 'react'

import OrderCartItem from './OrderCartItem'

const OrderCartList = ({ items }) => (
  !items.length ? <h3>No items yet</h3> :
  <div>
    {items.map(item => (
      <OrderCartItem
        key={item._id}
        item={item}
      />
    ))}
  </div>
)

export default OrderCartList
