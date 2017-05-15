import React from 'react'
import CartItem from './CartItem'
import { fetchCart } from '../actions/cart'

const CartList = ({ items }) => (
  <section>
    {items.map((item, index) => (
      <CartItem
        key={item.productId}
        index={index}
        {...item}
      />
    ))}
  </section>
)

export default CartList
