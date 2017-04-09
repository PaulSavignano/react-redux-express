import React, { Component } from 'react'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'


const CartPage = () => (
  <section className="section">
    <div className="android-section-title mdl-typography--display-1-color-contrast">Cart</div>
    <CartList />
    <CartTotal />
  </section>
)

export default CartPage
