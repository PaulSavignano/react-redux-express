import React from 'react'

import OrderItem from './OrderItem'

const OrderList = ({ items }) => (
  items.length ?
  <section>
    {items.map(item => (
      <OrderItem
        key={item._id}
        item={item}
      />
    ))}
  </section>
  :
  <section><h3>No items yet</h3></section>
)

export default OrderList
