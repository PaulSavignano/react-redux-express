import React from 'react'
import CartItem from './CartItem'

const CartList = ({ cart }) => (
  !cart.items.length ? <section><h1>Nothing in your cart yet</h1></section> :
  <div>
    {cart.items.map((item) => (
      <CartItem
        key={item.productId}
        {...item}
      />
    ))}
  </div>
)

export default CartList
