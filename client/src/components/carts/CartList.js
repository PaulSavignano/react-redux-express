import React, { Component } from 'react'
import Cart from './Cart'

class CartList extends Component {
  render() {
    return (
      <ul className="demo-list-control mdl-list">
        {this.props.carts.map(cart => (
          <Cart key={cart._id} {...cart} />
        ))}
      </ul>
    )
  }
}

export default CartList
