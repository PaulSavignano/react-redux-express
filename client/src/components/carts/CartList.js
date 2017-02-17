import React, { Component } from 'react'
import Cart from './Cart'

class CartList extends Component {
  render() {
    console.log(this.props)
    return (
      <ul className="demo-list-control mdl-list">
        {this.props.carts.map(cart => (
          <Cart key={cart.uuid} {...cart} />
        ))}
      </ul>
    )
  }
}

export default CartList
