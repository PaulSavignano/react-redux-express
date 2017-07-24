import React from 'react'


import CartItem from './CartItem'


const CartList = ({ cart }) => (
  cart.items.length &&
  <div>
    {cart.items.map(item => (
      <CartItem
        key={item.productId}
        item={item}
      />
    ))}
  </div>
)

export default CartList
