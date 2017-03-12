import React, { Component } from 'react'
import CartList from './CartList'
import CartSearch from './CartSearch'

class CartPage extends Component {
  render() {
    return (
      <div className="android-more-section">
        <div className="android-section-title mdl-typography--display-1-color-contrast">Products</div>
        <CartSearch/>
        <CartList />
      </div>
    )
  }
}

export default CartPage
