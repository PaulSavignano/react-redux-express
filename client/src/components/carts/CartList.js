import React, { Component } from 'react'
import Cart from './Cart'

class CartList extends Component {
  render() {
    return (
      <div>
        <h1>Cart</h1>
        {this.props.carts.map(cart => (
          <Cart key={cart._id} {...cart} />
        ))}
      </div>
    )
  }
}

export default CartList
