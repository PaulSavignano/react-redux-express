import React, { Component } from 'react'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'


const CartPage = () => (
  <div className="android-more-section">
    <div className="android-section-title mdl-typography--display-1-color-contrast">Cart</div>
    <CartList />
    <CartTotal />
  </div>
)

export default CartPage
