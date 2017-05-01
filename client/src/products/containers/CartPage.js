import React from 'react'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'

const CartPage = () => (
  <main  style={{ marginBottom: 90 }}>
    <h1>Cart</h1>
    <CartList />
    <CartTotal />
  </main>
)

export default CartPage
