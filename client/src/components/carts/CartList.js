import React, { Component } from 'react'
import Cart from './Cart'

class CartList extends Component {
  render() {
    return (
      <ul className="demo-list-control mdl-list">
        {this.props.carts.map(cart => (
          <Cart
            key={cart.uuid}
            {...cart}
            onCartUpdate={this.props.onCartUpdate}
            onCartDelete={this.props.onCartDelete}
          />
        ))}
      </ul>
    )
  }
}

export default CartList
