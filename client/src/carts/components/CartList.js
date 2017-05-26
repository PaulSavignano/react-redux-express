import React from 'react'
import CartItem from './CartItem'

const CartList = ({ items }) => (
  items ?
  <div>
    {items.map((item, index) => (
      <CartItem
        key={item.productId}
        index={index}
        {...item}
      />
    ))}
  </div>
  :
  <section><h1>Nothing in your cart yet</h1></section>
)

export default CartList
