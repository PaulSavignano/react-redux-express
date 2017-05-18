import React from 'react'

import OrderCartItem from './OrderCartItem'

const OrderList = ({ items }) => (
  items.length ?
  <section>
    {items.map(item => (
      <OrderCartItem
        key={item._id}
        item={item}
      />
    ))}
  </section>
  :
  <section><h3>No items yet</h3></section>
)

export default OrderList
