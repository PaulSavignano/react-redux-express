import React, { Component, PropTypes } from 'react'
import CartProduct from './CartProduct'

class Cart extends Component {
  render() {
    return (
      <div>
        <h1>Cart</h1>
        {this.props.cartProducts.map(cartProduct => (
          <CartProduct key={cartProduct._id} {...cartProduct} />
        ))}
      </div>
    )
  }
}

export default Cart
